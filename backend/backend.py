
from datetime import datetime
from flask import Flask , request ,render_template, url_for , redirect
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskFrom
from wtforms import StringField,SubmitField,BooleanField
from wtforms.validators import DataRequired
from chatbot import creat_thread_id , response

app = Flask(__name__)

app.config['SECRET_KEY']= 'iuwhei7923jijd'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db= SQLAlchemy(app)

class Course(db.Model):
    id = db.Column(db.Integer , primary_key =True)
    course_name = db.Column(db.String(20), unique = True , nullable = False)
    course_chat_id = db.column(db.Integer,unique = True,nullable = False)
    chatbot_history = db.relationship('Chatbot_history' , lazy = True)
    userhistory = db.relationship('User_chat_history' , lazy = True)
    Images  = db.relationship('Images', lazy = True)

class Images(db.Model):
    id = db.Column(db.Integer , primary_key =True)
    Images = db.Column(db.String(20))
    course_id=db.Column(db.Integer , db.ForeignKey('course.id'), nullable = False)


class Chatbot_history(db.Model):
    id = db.Column(db.Integer , primary_key =True)
    chatbotmsg = db.Column(db.String(200))
    timeasked = db.Column(db.DateTime , nullable = False , default = datetime.utcnow)
    course_id= db.Column(db.Integer , db.ForeignKey('course.id'), nullable = False)


class User_chat_history(db.Model):
    id = db.Column(db.Integer , primary_key =True)
    chatbotmsg = db.Column(db.String(200))
    timeasked = db.Column(db.DateTime , nullable = False , default = datetime.utcnow)
    course_id= db.Column(db.Integer , db.ForeignKey('course.id'), nullable = False)


class Creatform(FlaskForm):
    title = StringField('Title',validators =[DataRequired()])
    submit = SubmitField('Post')


class chatForm(FlaskForm):
    msg = StringField('Title',validators =[DataRequired()])
    submit = SubmitField('Post')




@app.route("/")
@app.route("/home")
def homepage():
    courses =   Course.query.all()
    render_template("index.html" , courses = courses)


@app.route("/creatclass",method = ["GET","POST"])
def creatclass(): # to creat a new chat bot thread
    form = Creatform()
    if form.validate_on_submite():
        newcourse = Course(course_name= form.title , course_chat_id = creat_thread_id() )
        db.session.add(newcourse)
        db.session.commit()
        redirect(url_for("home"))
    return render_template('create.html', form = form)

@app.route("/coursechat/<int:course_id>",method = ["GET","POST"])
def coursechat():
    form = chatForm()
    course = Course.query.filter_by(course_id= course_id)
    chatbothistory = Chatbot_history.query.filter_by(course_id= course_id).order_by(Post.date_posted.desc())
    Userhistory = User_chat_history.query.filter_by(course_id= course_id).order_by(Post.date_posted.desc())

    if form.validate_on_submit():
        msg = form.msg
        answer = response(course.course_chat_id,msg)
        newmsg = User_chat_history(chatbotmsg = msg , course_id =course_id)
        newanswer = Chatbot_history(chatbotmsg = answer , course_id =course_id)
        db.session.add(newmsg)
        db.session.add(newanswer)
        db.session.commit()
        return redirect(f'/coursechat/{course_id}')


    return render_template('chat.html', form = form, bot_history = chatbothistory , 
                           user_history = Userhistory , )



if __name__ == "main":
    app.run(debug == True)

'''left to add stuff related to the picture taken aka 2 things : feed it to the model , and save it in the database
i think thats pretty easy to do '''
