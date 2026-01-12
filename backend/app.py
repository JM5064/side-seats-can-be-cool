from flask import Flask, render_template, url_for, redirect
from models import db, Course, Images, ChatbotHistory, UserHistory, CreateForm, ChatForm
from chatbot import create_thread_id, response
from flask_cors import CORS
from dotenv import load_dotenv
from log import log
import os

load_dotenv

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"],)

app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
@app.route("/home")
def homepage():
    new_course = Course(course_name = 'comp551', course_chat_id = 2)
    db.session.add(new_course)
    db.session.commit()
    new_course = Course(course_name = 'comp552', course_chat_id = 3)
    db.session.add(new_course)
    db.session.commit()
    courses = Course.query.all()
    return {"ok": f'{courses}'} #{'courses' : courses }



@app.route("/createclass", methods=["GET", "POST"])
def create_class(): # to create a new chat bot threadg
    form = CreateForm()
    if form.validate_on_submit():
        new_course = Course(course_name = form.title.data, course_chat_id = create_thread_id())
        db.session.add(new_course)
        db.session.commit()

        return 201
        # return redirect(url_for("home"))
    
    return {"ok": True}

    # return render_template('create.html', form = form)


# TODO: sus
@app.route("/coursechat/<int:course_id>", methods=["GET","POST"])
def coursechat(course_id):
    form = ChatForm()
    course = Course.query.filter_by(course_id = course_id)
    chatbot_history = ChatbotHistory.query.filter_by(course_id = course_id).order_by(ChatbotHistory.date_posted.desc())
    user_history = UserHistory.query.filter_by(course_id = course_id).order_by(UserHistory.date_posted.desc())

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


if __name__ == "__main__":
    app.run(debug=True)

'''left to add stuff related to the picture taken aka 2 things : feed it to the model, and save it in the database
i think thats pretty easy to do '''
