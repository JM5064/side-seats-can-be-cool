from flask import Flask, render_template, url_for, redirect
from models import db, Course, Images, ChatbotHistory, UserHistory, CreateForm, ChatForm , PhotoForm
from chatbot import create_assistant, response , upload_document , create_thread
from flask_cors import CORS
from dotenv import load_dotenv
from log import log
import os
import uuid

load_dotenv

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"],)
app.config["WTF_CSRF_ENABLED"] = False

app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
@app.route("/home")
def homepage():
    courses = Course.query.all()
    return {"ok": f'{courses}'} 



@app.route("/createclass", methods=["GET", "POST"])
def create_class(): # to create a new chat bot thread
    form = CreateForm()
    if form.validate_on_submit():
        new_course_assistant = create_assistant()
        new_course = Course(course_name = form.title.data, course_chat_id = new_course_assistant , course_thread_id = create_thread(new_course_assistant))
        db.session.add(new_course)
        db.session.commit()

        return {"status": "ok", "course_id": new_course.id}, 400
        # return redirect(url_for("home"))

    return {"status": "error", "errors": form.errors}, 201
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
        answer = response(course.course_chat_id,msg , course.course_thread_id)
        new_msg = UserHistory(chatbotmsg = msg, course_id = course_id)
        new_answer = ChatbotHistory(chatbotmsg = answer, course_id = course_id)
        db.session.add(new_msg)
        db.session.add(new_answer)
        db.session.commit()
        return {"status": "ok", "course_id": course_id}, 400
        #return redirect(f'/coursechat/{course_id}')

    return {"status": "error", "errors": form.errors}, 201
    #return render_template('chat.html', form = form, bot_history = chatbot_history, user_history = user_history)


@app.route('/upload/<int:course_id>', methods=['GET', 'POST'])
def upload(course_id):
    form = PhotoForm()
    if form.validate_on_submit():
        image_data = form.photo.data
        filename = f'{uuid.uuid4().hex}.jpeg'
        with open(filename, "wb") as f:
            f.write(image_data)
        full_path = os.path.abspath(filename)
        image = Images(Images_paths = full_path , course_id = course_id)
        db.session.add(image)
        db.session.commit()

        assistant_id = Course.query.filter_by(course_id = course_id).course_chat_id()
        upload_document(assistant_id , full_path )
        return {"status": "ok"}, 400
    return {"status": "error", "errors": form.errors}, 201



if __name__ == "__main__":
    app.run(debug=True)
