import json
import re
from datetime import date, datetime
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt, jwt_required)
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import shutil
from moviepy.editor import VideoFileClip
from collections import Counter
from collections import defaultdict
from datetime import datetime

from AI import *
from chatbot import *
from meaning import *

# Initialize app
app = Flask(__name__)
app.secret_key = 'SECRET_KEY'
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"] = 'SECRET_KEY'
app.config['DATA'] = 'files\\media\\'
app.config['IMAGE'] = 'images'
app.config['UPLOADED_VIDEO'] = 'uploaded_videos'

app.config['DEFAULT_PHOTO_NAME'] = 'default.jpg'
app.config['VIDEO_WITH_LANDMARKS'] = 'video_srt'
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB
app.config['CORS_HEADERS'] = 'Content-Type'

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return "You should log in first."


@jwt.unauthorized_loader
def custom_error_callback(error):
    return jsonify({
        'msg': 'Authorization header is missing or invalid.'
    }), 401


login_manager.login_view = "/login"

login_manager.session_protection = "strong"

# Initialize Database
db = SQLAlchemy(app)


class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    user_email = db.Column(db.String(60), nullable=False, unique=True)
    user_password = db.Column(db.String(250), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    user_image = db.Column(db.String(250), nullable=True)  # will be changed to False
    user_birthdate = db.Column(db.String(50), nullable=True)  # will be changed to False
    lastLogin = db.Column(db.String(50), nullable=True, default=False)
    user_state = db.Column(db.String(50), nullable=False, default="Active")  # active, deactivate, blocked
    isOnline = db.Column(db.Boolean, nullable=False, default=False)
    user_video = db.relationship("Video", backref='user', cascade="all, delete")

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_id

    # constructor to initialize the data
    def __init__(self, user_first_name, user_last_name, user_email, user_password, user_image, user_birthdate):
        self.first_name = user_first_name
        self.last_name = user_last_name
        self.user_email = user_email
        self.user_password = user_password
        self.user_image = user_image
        self.user_birthdate = user_birthdate

    def get_videos(self):
        return db.session.query(Video).filter_by(user_id=self.user_id).all()

    # method to add video
    def add_video(self, video):
        # self.videos.append(video)
        db.session.add(video)  # the video added in adding method in class user
        db.session.commit()

    def remove_video(self, video_id):
        video_to_remove = Video.query.filter_by(video_id=video_id, uid=self.id).first()
        # self.videos.remove(video_to_remove)
        db.session.delete(video_to_remove)
        db.session.commit()


class Video(db.Model):
    video_id = db.Column(db.Integer, primary_key=True)
    video_title = db.Column(db.String(100), nullable=False)
    video_name = db.Column(db.String(255), nullable=False)
    video_subtitle1_path = db.Column(db.String(255), nullable=False)
    video_subtitle2_path = db.Column(db.String(255), nullable=False)
    video_date = db.Column(db.String(250), nullable=False)
    video_description = db.Column(db.String(255), nullable=True)
    video_duration = db.Column(db.Float, nullable=False)
    openai_meaning = db.Column(db.String(500), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    def __init__(self, video_title, video_name, video_subtitle1_path, video_subtitle2_path, video_date, user_id,
                 video_description, video_duration, openai_meaning):
        self.video_title = video_title
        self.video_name = video_name
        self.video_subtitle1_path = video_subtitle1_path
        self.video_subtitle2_path = video_subtitle2_path
        self.video_date = video_date
        self.user_id = user_id
        self.video_description = video_description
        self.video_duration = video_duration
        self.openai_meaning = openai_meaning


# Create Database
with app.app_context():
    db.create_all()
    # db.drop_all()


# @app.route('/remove-video', methods=['GET', "POST"])
def remove_video(video_id):
    current_user.remove_video(video_id)


@app.route('/register', methods=['POST'])
def register():
    _first_name = request.form['firstName']
    _last_name = request.form['lastName']
    _email = request.form['email']
    _password = request.form['password']
    _confirm_password = request.form['confirmPassword']
    _user_birthdate = request.form['userBD']
    _user_image = request.files['profileImage']

    existing_email = User.query.filter_by(user_email=_email).first()
    is_first_name_invalid = not validate_first_name(_first_name)
    is_last_name_invalid = not validate_last_Name(_last_name)
    is_email_invalid: bool = not validate_email(_email)
    is_exiting_email = existing_email is not None
    is_birth_date_invalid = not validate_birth_date(_user_birthdate)
    is_password_invalid = not validate_password(_password)
    is_password_confirmation_not_match = not check_password_match(_password, _confirm_password)

    is_profile_image_empty = check_profileImage_empty(_user_image)

    # endregion
    if is_first_name_invalid | is_last_name_invalid | is_email_invalid | is_exiting_email \
            | is_birth_date_invalid | is_password_confirmation_not_match | is_password_invalid:
        return jsonify({
            'isError': True,
            'Data': {
                'firstName': {'isError': is_first_name_invalid,
                              'msg': first_name_error(is_first_name_invalid)},
                'lastName': {'isError': is_last_name_invalid,
                             'msg': last_name_error(is_last_name_invalid)},
                'email': {'isError': is_email_invalid | is_exiting_email,
                          'msg': registration_email_error(is_email_invalid, is_exiting_email)},
                'Birthdate': {'isError': is_birth_date_invalid,
                              'msg': birth_date_error(is_birth_date_invalid)},
                'password': {'isError': is_password_invalid | is_password_confirmation_not_match,
                             'msg': registration_password_error(is_password_invalid,
                                                                is_password_confirmation_not_match)}

            }})

    hashed_password = generate_password_hash(
        _password, method='pbkdf2:sha256',
        salt_length=8
    )

    new_user = User(_first_name, _last_name, _email, hashed_password, "", _user_birthdate)
    db.session.add(new_user)
    db.session.commit()

    image_path = return_image_path(is_profile_image_empty, _user_image, new_user)
    # update the db with new value of
    new_user.user_image = image_path
    db.session.commit()

    return jsonify(SUCCESS_MESSAGE['Data'])


@app.route("/login", methods=['POST', 'GET'])
def login():
    _email = request.json['email']
    _password = request.json['password']

    user = User.query.filter_by(user_email=_email).first()
    is_login_email_dose_not_exist = user is None

    if current_user.is_authenticated:
        return "User is already logged in."
    else:

        if not is_login_email_dose_not_exist:
            is_password_dose_not_match_email = not check_password_hash(user.user_password, _password)

            if is_password_dose_not_match_email:
                return jsonify({
                    'isError': True,
                    'Data': {
                        'email': {'isError': is_login_email_dose_not_exist,
                                  'msg': login_email_error(is_login_email_dose_not_exist)},
                        'password': {'isError': is_password_dose_not_match_email,
                                     'msg': login_password_error(is_password_dose_not_match_email)},
                    }})

            else:
                login_user(user)
                User.query.filter_by(user_id=current_user.user_id).update(dict(isOnline=True))
                updateLastLogin()
                db.session.commit()
                access_token = create_access_token(identity=user.user_id, expires_delta=False)
                return jsonify({

                    'response_data':
                        {
                            'isError': False,
                        },
                    'jwt': access_token,
                    'isAdmin': user.is_admin
                }
                )

        else:
            return jsonify({
                'isError': True,
                'Data': {
                    'email': {'isError': is_login_email_dose_not_exist,
                              'msg': login_email_error(is_login_email_dose_not_exist)},
                }})


@app.route('/profile-page', methods=['GET'])
@jwt_required()
def profilePage():
    token = get_jwt()
    user = get_current_user(token)
    id = token['sub']

    return jsonify({
        'Data': {
            'response_data':
                {
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                    'email': user.user_email,
                    'userImage': f'http://localhost:5000/photos/{user.user_image}/{id}',
                    'userBirthDate': user.user_birthdate,
                    'isAdmin': user.is_admin,
                }
        }
    })


@app.route("/edit-profile", methods=['PUT'])
@jwt_required()
def edit_profile():
    token = get_jwt()
    user = get_current_user(token)
    formm = request.form
    _first_name = formm['firstName']
    _last_name = formm['lastName']
    _email = formm['email']
    _password = formm['password']
    _confirm_password = formm['confirmPassword']
    _user_image = request.files['profileImage']
    _user_birthdate = formm['userBD']

    is_first_name_invalid = not validate_first_name(_first_name)
    is_last_name_invalid = not validate_last_Name(_last_name)
    is_email_invalid: bool = not validate_email_for_edit(_email)
    is_password_invalid = not validate_password(_password)
    is_email_exist = check_email_exist_for_edit(_email, user)
    is_password_confirmation_not_match = not check_password_match(_password, _confirm_password)
    is_profile_image_empty = check_profileImage_empty(_user_image)

    if is_first_name_invalid or is_last_name_invalid or is_email_invalid or is_email_exist or is_password_invalid or \
            is_password_confirmation_not_match:
        return jsonify({
            'isError': True,
            'Data': {
                'firstName': {'isError': is_first_name_invalid,
                              'msg': first_name_error(is_first_name_invalid)},
                'lastName': {'isError': is_last_name_invalid,
                             'msg': last_name_error(is_last_name_invalid)},
                'email': {'isError': is_email_invalid | is_email_exist,
                          'msg': edit_email_error(is_email_invalid, is_email_exist)},
                'password': {'isError': is_password_invalid | is_password_confirmation_not_match,
                             'msg': registration_password_error(is_password_invalid,
                                                                is_password_confirmation_not_match)},

            }})
    else:
        # hashed password
        hashed_password = generate_password_hash(
            _password, method='pbkdf2:sha256',
            salt_length=8
        )

        # assign user email if he isn't specify new one
        if not _email:
            _email = user.user_email

        # assign profile_image if he isn't specify new one
        if _user_image:
            user_image_path = return_image_path(is_profile_image_empty, _user_image, user)
        else:
            user_image_path = user.user_image

        # user folder
        folder_name = get_user_folder_name(user)

        update_changes(_email, _first_name, _last_name, _user_birthdate, hashed_password, user, user_image_path)

        update_user_folder(user, folder_name)

        return jsonify(SUCCESS_MESSAGE['Data'])


def check_email_exist_for_edit(_email, user):
    existing_email = User.query.filter_by(user_email=_email).first()
    if _email == user.user_email:
        return False
    elif existing_email is not None:
        return True


@app.route('/upload-video', methods=['POST'])
@jwt_required()
def upload_video():
    token = get_jwt()
    user = get_current_user(token)
    if request.method == "POST" and "video" in request.files:
        _video = request.files["video"]
        _video_title = request.form['video_title']
        _description = request.form['video_description']
        _landmarks = request.form['landMarks']
        current_date = datetime.today().strftime("%Y-%m-%d")

        video_name = secure_filename(_video.filename)

        # subtitle 1, 2
        sub_1 = get_subtitle_1(video_name)
        sub_2 = get_subtitle_2(video_name)

        user_folder_name = get_user_folder_name(user)

        # create folder by username
        folder_path = os.path.join(app.config['DATA'], user_folder_name)
        os.makedirs(folder_path, exist_ok=True)

        # path for uploaded videos.
        uploaded_video_path = os.path.join(get_app_path(), folder_path, app.config['UPLOADED_VIDEO'])
        os.makedirs(uploaded_video_path, exist_ok=True)

        # Save the uploaded videos.
        video_path = os.path.join(uploaded_video_path, video_name)
        _video.save(video_path)

        # pass two paths to AI model
        destination_path = folder_path + '\\' + app.config['VIDEO_WITH_LANDMARKS']
        test_model_new(video_path, destination_path, _landmarks)

        video_duration = get_video_duration(destination_path, video_name)

        video = Video(_video_title, video_name, sub_1, sub_2, current_date, user.user_id, _description, video_duration,
                      "")
        openai_meaning = get_openai_meaning(destination_path, sub_2)
        video.openai_meaning = openai_meaning

        user.add_video(video)

        return "File has been uploaded."
    else:
        return "Please, select video to upload."


@app.route('/display-videos', methods=['GET'])
@jwt_required()
def display_all_videos():
    token = get_jwt()
    user = get_current_user(token)
    id = token['sub']
    # return all videos.
    all_videos = Video.query.filter_by(user_id=user.user_id)
    video_data = [
        {
            'URL': f'http://localhost:5000/videos/{video.video_name}/{id}',
            'video_title': video.video_title,
            'video_description': video.video_description,
            'video_id': video.video_id,
            'openai_meaning': video.openai_meaning,
            'subtitles': [
                {
                    'subtitle_1': f'http://localhost:5000/videos/{video.video_subtitle1_path}/{id}',
                },
                {
                    'subtitle_2': f'http://localhost:5000/videos/{video.video_subtitle2_path}/{id}'
                }
            ]
        }
        for video in all_videos]
    return {'videos': video_data}


@app.route(f'/videos/<path:filename>/<int:id>')
def get_video(filename, id):
    user = get_current_user_by_id(id)
    video_path = os.path.join(get_app_path(), app.config['DATA'], get_user_folder_name(user),
                              app.config['VIDEO_WITH_LANDMARKS'] + '\\')
    return send_from_directory(video_path, filename, as_attachment=False)


@app.route(f'/videos/<path:filename>/<int:id>')
def get_sub_1(filename, id):
    user = get_current_user_by_id(id)
    sub_path_2 = os.path.join(get_app_path(), app.config['DATA'], get_user_folder_name(user),
                              app.config['VIDEO_WITH_LANDMARKS'] + '\\')
    return send_from_directory(sub_path_2, filename, as_attachment=False, mimetype='text/vtt')


@app.route(f'/videos/<path:filename>/<int:id>')
def get_sub_2(filename, id):
    user = get_current_user_by_id(id)
    sub_path_2 = os.path.join(get_app_path(), app.config['DATA'], get_user_folder_name(user),
                              app.config['VIDEO_WITH_LANDMARKS'] + '\\')
    return send_from_directory(sub_path_2, filename, as_attachment=False, mimetype='text/vtt')


@app.route('/photos/<path:filename>/<int:id>')
def get_image(filename, id):
    user = get_current_user_by_id(id)
    photo_path = os.path.join(get_app_path(), app.config['DATA'], get_user_folder_name(user), app.config['IMAGE'])
    return send_from_directory(photo_path, filename)


@app.route("/logout")
@login_required
def logout():
    updateIsOnline()
    db.session.commit()
    logout_user()
    return 'u are logged out'


@app.route('/statistics-one', methods=['GET'])
@jwt_required()
def get_statistics_one():
    token = get_jwt()
    user = get_current_user(token)
    all_videos = Video.query.filter_by(user_id=user.user_id).all()
    #
    last_7_videos = sorted(all_videos, key=lambda x: x.video_date, reverse=True)[:7]
    total_sec = 0
    total_videos_number = 0
    for video in last_7_videos:
        total_videos_number += 1
        total_sec = total_sec + video.video_duration
    return jsonify({
        "Data": {
            'total_duration': round(total_sec, 3),
            'total_videos_number_per_month': get_number_of_videos_per_month(last_7_videos),
            'total_videos_number': get_total_videos_number(last_7_videos),
            'last_uploaded_date': get_last_uploaded_date(last_7_videos)
        }
    })


@app.route('/statistics-two', methods=['GET'])
@jwt_required()
def get_statistics_two():
    token = get_jwt()
    user = get_current_user(token)
    all_videos = Video.query.filter_by(user_id=user.user_id).all()

    video_list = []
    for video in all_videos:
        video_data = {
            "video_id": video.video_id,
            "title": video.video_title,
            'URL': f'http://localhost:5000/videos/{video.video_name}/{user.user_id}'
        }
        video_list.append(video_data)

    return jsonify({
        "Data": {
            "videos": video_list
        }
    })


@app.route('/video-statistics/<int:id>/', methods=['GET'])
@jwt_required()
def get_video_statistics(id):
    token = get_jwt()
    user = get_current_user(token)
    _user_id = user.user_id

    _video_id = id
    #
    user = User.query.get(_user_id)
    user_folder_name = get_user_folder_name(user)
    #
    video = Video.query.get(_video_id)
    video_title = video.video_subtitle1_path

    srt_path = os.path.join(get_app_path(), app.config['DATA'], user_folder_name, 'video_srt', video_title)
    print(srt_path)
    result = most_repeated_words(srt_path)
    return result


# ==========================admin========================================
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_data = {
            "user_id": user.user_id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "user_email": user.user_email,
            "user_birthdate": user.user_birthdate,
            "lastLogin": user.lastLogin,
            "isOnline": user.isOnline
        }
        user_list.append(user_data)

    return jsonify({'Data': user_list})


# Function to delete a user
@app.route('/del-usr/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    user_dir_path = os.path.join(get_app_path(), app.config['DATA'], get_user_folder_name(user))
    print(user_dir_path)
    if user:
        db.session.delete(user)
        db.session.commit()
        delete_user_directory(user_dir_path)
        return jsonify({"message": "User deleted successfully"})
    else:
        return jsonify({"message": "User not found"})


@app.route('/videos/<int:id>', methods=['GET'])
def get_user_videos(id):
    videos = Video.query.filter_by(user_id=id).all()
    video_list = []
    for video in videos:
        video_data = {
            'URL': f'http://localhost:5000/videos/{video.video_name}/{id}',
            "video_id": video.video_id,
            "video_title": video.video_title,
            "video_description": video.video_description,
            'video_duration': str(video.video_duration) + " Sec",
            'uploaded_date': video.video_date.split(".")[0]
        }
        video_list.append(video_data)
    return jsonify({'Data': video_list})


# Function to delete a video
@app.route('/del-vid/<int:id>', methods=['DELETE'])
def delete_video(id):
    video = Video.query.get(id)
    if video:
        db.session.delete(video)
        db.session.commit()
        return jsonify({"message": "Video deleted successfully"})
    else:
        return jsonify({"message": "Video not found"})


@app.route('/admin-statistics', methods=['GET'])
def admin_statistics():
    total_users = User.query.count()
    total_videos = Video.query.count()

    get_total_videos_over_username()

    return jsonify({
        'total_users': total_users,
        'total_videos': total_videos,
        'total_videos_uploaded_this_month': get_total_videos_uploaded_this_month(),
        'username_over_total_duration': get_total_duration_over_username(),
        'username_over_total_videos': get_total_videos_over_username()
    })


# ==============================Chatbot==============================================
@app.route('/chatbot', methods=['POST'])
def chatbot():
    question = request.json['question']
    result = query(question)
    return result


########################################################################################################################

SUCCESS_MESSAGE = ({
    'Data': {
        'response_data':
            {
                'isError': False,
            }

    }})

REGISTRATION_ERROR_MESSAGES = {
    'firstName_error': 'First name must be at least 3 characters and contain no special symbols.',
    'lastName_error': 'Last name must be at least 3 characters and contain no special symbols.',
    'invalid_email': 'Email is invalid.',
    'email_exists': 'Email already exists in our system.',
    'invalid_birthDate': 'Birth date is required',
    'invalid_password': 'Password is invalid.',
    'dose_not_match': 'Password and Confirm Password dose not match.',
    # 'name_error': 'First and Last name must be at least 3 characters and contain no special symbols.',

}

LOGIN_ERROR_MESSAGES = {
    'login_email_error': 'Email dose not exist.',
    'password_login_error': 'Password incorrect.'
}


def first_name_error(is_first_name_invalid):
    if is_first_name_invalid:
        return REGISTRATION_ERROR_MESSAGES['firstName_error']


def last_name_error(is_last_name_invalid):
    if is_last_name_invalid:
        return REGISTRATION_ERROR_MESSAGES['lastName_error']


def birth_date_error(is_birth_date_invalid):
    if is_birth_date_invalid:
        return REGISTRATION_ERROR_MESSAGES['invalid_birthDate']


def registration_email_error(is_email_invalid, is_exiting_email):
    if is_email_invalid:
        return REGISTRATION_ERROR_MESSAGES['invalid_email']
    if is_exiting_email:
        return REGISTRATION_ERROR_MESSAGES['email_exists']


def registration_password_error(is_password_invalid, is_password_confirmation_match):
    if is_password_invalid:
        return REGISTRATION_ERROR_MESSAGES['invalid_password']
    elif is_password_confirmation_match:
        return REGISTRATION_ERROR_MESSAGES['dose_not_match']


def login_email_error(is_login_email_dose_not_exist):
    if is_login_email_dose_not_exist:
        return LOGIN_ERROR_MESSAGES['login_email_error']


def login_password_error(is_password_confirmation_not_match):
    if is_password_confirmation_not_match:
        return LOGIN_ERROR_MESSAGES['password_login_error']


def edit_email_error(is_email_invalid, is_exiting_email):
    if is_email_invalid:
        return REGISTRATION_ERROR_MESSAGES['invalid_email']
    if is_exiting_email:
        return REGISTRATION_ERROR_MESSAGES['email_exists']


######################################################################################

def validate_first_name(_first_name):
    if len(_first_name) < 3 or re.search(r'[^a-zA-Z\s]', _first_name):
        return False
    else:
        return True


def validate_last_Name(_last_name):
    if len(_last_name) < 3 or re.search(r'[^a-zA-Z\s]', _last_name):
        return False
    else:
        return True


def validate_email(_email):
    if re.match(r'[^@]+@[^@]+\.[^@]+', _email):
        if re.match(r'^[a-zA-Z0-9@.]+$', _email):
            return True
        else:
            return False
    else:
        return False


def validate_email_for_edit(_email):
    if not _email:
        return True
    if re.match(r'[^@]+@[^@]+\.[^@]+', _email):
        if re.match(r'^[a-zA-Z0-9@.]+$', _email):
            return True
        else:
            return False
    else:
        return False


def validate_birth_date(_user_birthdate):
    if _user_birthdate == "":
        return False
    else:
        return True


def validate_password(password):
    if len(password) < 8:
        return False
    if not re.search("[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True


def check_password_match(password, _confirm_password):
    if password != _confirm_password:
        return False
    else:
        return True


def check_profileImage_empty(_user_image):
    if 'profileImage' in request.files and bool(request.files['profileImage'].filename):
        return False
    else:
        return True


def updateLastLogin():
    User.query.filter_by(user_id=current_user.user_id).update(dict(lastLogin=date.today()))


def updateIsOnline():
    User.query.filter_by(user_id=current_user.user_id).update(dict(isOnline=False))


def update_changes(_email, _first_name, _last_name, _user_birthdate, hashed_password, user, user_image_path):
    User.query.filter_by(user_id=user.user_id) \
        .update(dict(first_name=_first_name, last_name=_last_name, user_email=_email, user_password=hashed_password,
                     user_image=user_image_path,
                     user_birthdate=_user_birthdate))
    db.session.commit()


def get_app_path():
    return basedir + '\\'


def get_current_user(token):
    return User.query.filter_by(user_id=token['sub']).first()


def get_current_user_by_id(id):
    return User.query.filter_by(user_id=id).first()


def get_subtitle_2(video_name):
    sub_2 = video_name.split(".")[0] + '_meaning.vtt'
    return sub_2


def get_subtitle_1(video_name):
    sub_1 = video_name.split(".")[0] + '.vtt'
    return sub_1


def get_user_folder_name(user):
    folder_name = f"{user.first_name}_{user.last_name}_{user.user_id}"
    return folder_name


def return_image_path(is_profile_image_empty_, _user_image, user):
    user_folder_name = get_user_folder_name(user)
    folder_path = os.path.join(app.config['DATA'], user_folder_name, app.config['IMAGE'])
    os.makedirs(folder_path, exist_ok=True)

    if not is_profile_image_empty_:
        image_name = secure_filename(_user_image.filename)
        image_path = os.path.join(get_app_path(), folder_path, image_name)
        _user_image.save(image_path)
        return image_name

    else:
        # copy default to user folder
        source_path = os.path.join(get_app_path(), app.config['DEFAULT_PHOTO_NAME'])
        destination_path = os.path.join(get_app_path(), folder_path, app.config['DEFAULT_PHOTO_NAME'])
        shutil.copy(source_path, destination_path)
        return app.config['DEFAULT_PHOTO_NAME']


def update_user_folder(user, folder_name):
    old_folder_path = os.path.join(app.config['DATA'], folder_name)

    new_folder_name = f"{user.first_name}_{user.last_name}_{user.user_id}"
    new_folder_path = os.path.join(app.config['DATA'], new_folder_name)

    os.rename(old_folder_path, new_folder_path)


def delete_user_directory(directory_path):
    try:
        shutil.rmtree(directory_path)
        return {"message": f"Directory '{directory_path}' deleted successfully"}
    except FileNotFoundError:
        return {"message": f"Directory '{directory_path}' not found"}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}


def get_openai_meaning(video_path, sub2):
    file_path = os.path.join(video_path, sub2)
    with open(file_path, "r") as file:
        content = file.read()
    result = query(content)
    return result


def get_total_videos_uploaded_this_month():
    current_date = datetime.today().strftime("%Y-%m-%d")
    total_videos_uploaded_today = Video.query.filter(Video.video_date == current_date).count()
    return total_videos_uploaded_today


def get_total_duration_over_username():
    query = db.session.query(User.first_name, User.last_name, func.sum(Video.video_duration))
    # Join the User and Video tables based on the user_id relationship
    query = query.join(Video, User.user_id == Video.user_id)
    # Group the results by user
    query = query.group_by(User.user_id)
    # Retrieve the results
    results = query.all()
    user_video_data = []
    for result in results:
        # it is like result[0] = first_name, result[1] = last_name ...
        first_name, last_name, video_duration = result
        user_video_data.append({'username': f"{result.first_name} {result.last_name}",
                                'video_duration': video_duration})
    return user_video_data


def get_total_videos_over_username():
    query = db.session.query(User.first_name, User.last_name, func.count(Video.video_id))
    # Join the User and Video tables based on the user_id relationship
    query = query.join(Video, User.user_id == Video.user_id)
    # Group the results by user
    query = query.group_by(User.first_name, User.last_name)
    # Retrieve the results
    results = query.all()
    user_video_data = []
    for result in results:
        first_name, last_name, video_count = result
        user_video_data.append({'name': f"{first_name} {last_name}", 'video_count': video_count})
    return user_video_data


# ================Statistics_1======================
def get_number_of_videos_per_month(all_videos):
    video_stats = [0] * 12

    # Define multiple possible datetime formats
    datetime_formats = ["%Y-%m-%d", "%Y-%m-%d"]

    for video in all_videos:
        # Try parsing the video date with each format until successful
        for fmt in datetime_formats:
            try:
                video_date = datetime.strptime(video.video_date, fmt)
                break
            except ValueError:
                continue

        # Extract the month from the datetime object and subtract one for zero-indexing
        month_index = video_date.month - 1

        # Increment the count for the corresponding month
        video_stats[month_index] += 1

    return video_stats


def get_total_videos_number(all_videos):
    total_videos_number = 0
    for video in all_videos:
        total_videos_number += 1
    return total_videos_number


def get_last_uploaded_date(all_videos):
    last_date = None
    for i in range(len(all_videos)):
        video = all_videos[i]
        if last_date is None or video.video_date > last_date:
            last_date = video.video_date
    if last_date is not None:
        last_date_str = str(last_date)
        last_date = last_date_str.split(".")[0]
    return last_date


def get_video_duration(destination_path, video_name):
    video_path = os.path.join(destination_path, video_name)
    video = VideoFileClip(video_path)
    video_duration = video.duration
    return video_duration


# ================Statistics_2======================

def clean_word(word):
    word = re.sub(r'^\W+|\W+$', '', word).lower()
    return word


def most_repeated_words(filename):
    with open(filename, 'r') as file:
        text = file.read()

        # Remove timestamps and other non-word characters
        text = re.sub(r'<.*?>', '', text)  # Remove HTML tags if present
        text = re.sub(r'\d+:\d+:\d+,\d+ --> \d+:\d+:\d+,\d+\n', '', text)  # Remove timestamps
        text = re.sub(r'\n', ' ', text)  # Replace line breaks with spaces
        text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
        text = re.sub(r'WEBVTT', '', text)  # Remove WEB VTT

        words = text.split()

        word_counts = Counter(clean_word(word) for word in words if not re.search(r'\d', word))

    most_common = word_counts.most_common()
    max_count = most_common[0][1]

    most_repeated = [{"word": word, "count": count} for word, count in most_common if count == max_count]

    result_json = jsonify({'Data': most_repeated})
    return result_json


# Run server
if __name__ == '__main__':
    app.run(debug=True)
