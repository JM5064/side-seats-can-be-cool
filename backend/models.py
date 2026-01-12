from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


db = SQLAlchemy()


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
