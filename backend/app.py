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
async def create_class(): # to create a new chat bot thread
    form = CreateForm()
    if form.validate_on_submit():
        new_course_assistant = await create_assistant()
        new_course = Course(course_name = form.title.data, course_chat_id = new_course_assistant , course_thread_id = await create_thread(new_course_assistant))
        
        db.session.add(new_course)
        db.session.commit()

        return {"status": "ok", "course_id": new_course.id}, 201
    
    return {"status": "error", "errors": form.errors}, 400


@app.route("/coursechat/<int:course_id>", methods=["GET","POST"])
async def coursechat(course_id):
    form = ChatForm()
    course = Course.query.filter_by(id = course_id).first()

    if form.validate_on_submit():
        msg = form.msg.data
        answer = await response(msg, course.course_thread_id)
        new_msg = UserHistory(chatbot_msg = msg, course_id = course_id)
        new_answer = ChatbotHistory(chatbot_msg = answer, course_id = course_id)
        db.session.add(new_msg)
        db.session.add(new_answer)
        db.session.commit()

        return {"status": "ok", "course_id": course_id, "response": answer}, 201

    return {"status": "error", "errors": form.errors}, 400


@app.route("/getchat/<int:course_id>", methods=["GET"])
async def get_chats(course_id):
    course = Course.query.filter_by(id = course_id).first()
    user_chats = UserHistory.query.filter_by(course_id = course.id).order_by(UserHistory.time_asked.asc())
    chatbot_chats = ChatbotHistory.query.filter_by(course_id = course.id).order_by(ChatbotHistory.time_asked.asc())
    
    user_chats_list = [chat.chatbot_msg for chat in user_chats]
    chatbot_chats_list = [chat.chatbot_msg for chat in chatbot_chats]

    return {"status": "ok", "user_chats": user_chats_list, "chatbot_chats": chatbot_chats_list}, 201

@app.route("/getcourses", methods=["GET"])
async def get_courses():
    courses = Course.query
    
    courses_list = [{ "title": course.course_name, "id": course.id } for course in courses]

    return {"status": "ok", "courses": courses_list}, 201



@app.route('/upload/<int:course_id>', methods=['GET', 'POST'])
async def upload(course_id):
    form = PhotoForm()
    if form.validate_on_submit():
        image_data = form.photo.data
        filename = f'{uuid.uuid4().hex}.jpeg'
        image_data.save(filename)

        photos_dir = os.path.join(os.getcwd(), "backend/photos")
        full_path = f'{photos_dir}/{filename}'
        os.rename(filename, full_path)
        
        image = Images(Images_path = full_path, course_id = course_id)
        db.session.add(image)
        db.session.commit()
        course = Course.query.filter_by(id = course_id).first()
        assistant_id = course.course_chat_id
        await upload_document(assistant_id , full_path )
        answer = await response("Analyze the document provided to you", course.course_thread_id)
        log(answer)
        return {"status": "ok"}, 201
    
    return {"status": "error", "errors": form.errors}, 400



if __name__ == "__main__":
    app.run(debug=True)
