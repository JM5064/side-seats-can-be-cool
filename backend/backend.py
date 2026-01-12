from datetime import datetime
from flask import Flask, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from chatbot import create_thread_id, response

app = Flask(__name__)


app.config['SECRET_KEY'] = 'iuwhei7923jijd'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)



class Course(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    course_name = db.Column(db.String(20), unique = True, nullable = False)
    course_chat_id = db.Column(db.Integer, unique = True, nullable = False)
    chatbot_history = db.relationship('ChatbotHistory', lazy = True)
    user_history = db.relationship('UserHistory', lazy = True)
    Images = db.relationship('Images', lazy = True)


class Images(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    Images = db.Column(db.String(20))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable = False)


class ChatbotHistory(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    chatbot_msg = db.Column(db.String(200))
    time_asked = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable = False)


class UserHistory(db.Model):
    id = db.Column(db.Integer, primary_key =True)
    chatbot_msg = db.Column(db.String(200))
    time_asked = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    course_id= db.Column(db.Integer, db.ForeignKey('course.id'), nullable = False)


class CreateForm(FlaskForm):
    title = StringField('Title', validators = [DataRequired()])
    submit = SubmitField('Post')


class ChatForm(FlaskForm):
    msg = StringField('Title', validators = [DataRequired()])
    submit = SubmitField('Post')


@app.route("/")
@app.route("/home")
def homepage():
    courses = Course.query.all()
    render_template("index.html", courses = courses)


@app.route("/createclass", method = ["GET", "POST"])
def create_class(): # to creat a new chat bot thread
    form = CreateForm()
    if form.validate_on_submit():
        new_course = Course(course_name = form.title, course_chat_id = create_thread_id())
        db.session.add(new_course)
        db.session.commit()
        redirect(url_for("home"))
    return render_template('create.html', form = form)


@app.route("/coursechat/<int:course_id>",method = ["GET","POST"])
def coursechat():
    form = ChatForm()
    course = Course.query.filter_by(course_id = course_id)
    chatbot_history = ChatbotHistory.query.filter_by(course_id = course_id).order_by(Post.date_posted.desc())
    user_history = UserHistory.query.filter_by(course_id = course_id).order_by(Post.date_posted.desc())

    if form.validate_on_submit():
        msg = form.msg
        answer = response(course.course_chat_id,msg)
        new_msg = UserHistory(chatbotmsg = msg, course_id = course_id)
        new_answer = ChatbotHistory(chatbotmsg = answer, course_id = course_id)
        db.session.add(new_msg)
        db.session.add(new_answer)
        db.session.commit()
        return redirect(f'/coursechat/{course_id}')
    
    return render_template('chat.html', form = form, bot_history = chatbot_history, 
                           user_history = user_history)


if __name__ == "main":
    app.run(debug=True)

'''left to add stuff related to the picture taken aka 2 things : feed it to the model, and save it in the database
i think thats pretty easy to do '''
