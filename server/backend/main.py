import os
import re
from datetime import date, datetime

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt, jwt_required)
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

from AI import *

# region app
# Initialize app
app = Flask(__name__)
app.secret_key = 'SECRET_KEY'
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)
# take the path of the project
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"] = 'SECRET_KEY'
app.config['UPLOAD_FOLDER'] = 'files\\videos\\'
app.config['UPLOADED_VIDEOS_DEST'] = 'files\\videos\\'
app.config['UPLOADED_PHOTOS_DEST'] = 'files\\photos\\'
app.config['DEFAULT_PHOTO'] = 'files\\default_photos\\'
app.config['DEFAULT_PHOTO_NAME'] = 'default.jpg'
app.config['VIDEO_WITH_LANDMARKS'] = 'video_srt'
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB
app.config['CORS_HEADERS'] = 'Content-Type'
# endregion
login_manager = LoginManager()
login_manager.init_app(app)

photos = UploadSet('photos', extensions=('jpg', 'jpeg', 'png'))

# Configure the UploadSet
configure_uploads(app, photos)


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
    })


login_manager.login_view = "/login"

login_manager.session_protection = "strong"

# Initialize Database
db = SQLAlchemy(app)


# table user
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
    user_video = db.relationship("Video", backref='user')

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
    video_path = db.Column(db.String(255), nullable=False)
    video_subtitle1_path = db.Column(db.String(255), nullable=True)
    video_subtitle2_path = db.Column(db.String(255), nullable=True)
    video_date = db.Column(db.String(250), nullable=False)
    video_description = db.Column(db.String(255), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    def __init__(self, video_title, video_path, video_date, user_id, video_description):
        self.video_title = video_title
        self.video_path = video_path
        self.video_date = video_date
        self.user_id = user_id
        self.video_description = video_description


# @app.route('/remove-video', methods=['GET', "POST"])
def remove_video(video_id):
    current_user.remove_video(video_id)


# @app.route('/display-videos', methods=['GET'])
# @jwt_required()
# def display_all_videos():
#     token = get_jwt()
#     user = method_name(token)
#     videos = Video.query.filter_by(user_id=user.user_id)
#     allRows = []
#     for video in videos:
#         allRows.append({
#             'videoTitle': video.video_title,
#             'video_path': video.video_path,
#             # 'videoDate': video.video_date,
#             'video_description': video.video_description,
#             'video_subtitle1': video.video_subtitle1_path,
#             'video_subtitle2': video.video_subtitle2_path,
#
#         })
#
#     return jsonify({
#         'response_data':
#             {
#                 'videos': allRows
#             }
#
#     })


@app.route('/upload-video', methods=['POST'])
@jwt_required()
def upload_video():
    token = get_jwt()
    user = get_userID(token)
    if request.method == "POST" and "video" in request.files:
        _video = request.files["video"]
        _video_title = request.form['video_title']
        _description = request.form['video_description']
        _landMarks = request.form['landMarks']
        # hstlm el viarbale da ezay.
        current_date = datetime.now()

        folder_name = get_user_folder(user)
        folder_path = os.path.join(app.config['UPLOADED_VIDEOS_DEST'], folder_name)
        os.makedirs(folder_path, exist_ok=True)

        # Save the uploaded video to the user's folder
        video_filename = secure_filename(_video.filename)
        video_path = get_app_path() + os.path.join(folder_path, video_filename)
        _video.save(video_path)

        dest_path = basedir + '\\' + app.config['VIDEO_WITH_LANDMARKS']

        video = Video(_video_title, video_path, current_date, user.user_id, _description)

        # amr hy3dl el function 3shan yst2blo.
        test_model_new(video_path, dest_path)
        user.add_video(video)

        return "File has been uploaded."
    else:
        return "You should log in first."


@app.route('/display-videos', methods=['GET'])
@jwt_required()
def display_all_videos():
    token = get_jwt()
    user = get_userID(token)
    all_videos = Video.query.filter_by(user_id=user.user_id)
    path_to_be_removed = app.config['UPLOADED_VIDEOS_DEST'] + get_user_folder(user) + '\\'
    video_data = [{'URL': f'http://localhost:5000/videos/{remove_path(video.video_path, path_to_be_removed)}',
                   'video_title': video.video_title, 'video_description': video.video_description}
                  for video in all_videos]
    return {'videos': video_data}


@app.route('/videos/<path:filename>')
def get_video(filename):
    directroy = basedir + '\\' + app.config['UPLOADED_VIDEOS_DEST']
    return send_from_directory(directroy, filename)


@app.route('/photos/<path:filename>')
def get_photo(filename):
    directroy = basedir + '\\' + app.config['UPLOADED_PHOTOS_DEST']
    return send_from_directory(directroy, filename)


@app.route("/edit-profile", methods=['POST'])
@jwt_required()
def edit_profile():
    token = get_jwt()
    user = get_userID(token)
    formm = request.form
    _first_name = formm['firstName']
    _last_name = formm['lastName']
    _email = formm['email']
    _password = formm['password']
    _confirm_password = formm['confirmPassword']
    _user_image = request.files['profileImage']

    _user_birthdate = formm['userBD']

    imageFile = photos.save(_user_image)
    user_image_path = basedir + '\\' + app.config['UPLOADED_PHOTOS_DEST'] + imageFile

    existing_email = User.query.filter_by(user_email=_email).first()
    is_first_name_invalid = not validate_first_name(_first_name)
    is_last_name_invalid = not validate_last_Name(_last_name)
    is_email_invalid: bool = not validate_email(_email)
    is_password_invalid = not validate_password(_password)
    is_exiting_email = existing_email is not None

    is_password_confirmation_not_match = not check_password_match(_password, _confirm_password)

    if is_first_name_invalid | is_last_name_invalid | is_email_invalid | is_exiting_email | is_password_invalid | \
            is_password_confirmation_not_match:
        return jsonify({
            'isError': True,
            'Data': {
                'firstName': {'isError': is_first_name_invalid,
                              'msg': first_name_error(is_first_name_invalid)},
                'lastName': {'isError': is_last_name_invalid,
                             'msg': last_name_error(is_last_name_invalid)},
                'email': {'isError': is_email_invalid | is_exiting_email,
                          'msg': edit_email_error(is_email_invalid, is_exiting_email)},
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

        User.query.filter_by(user_id=user.user_id) \
            .update(dict(first_name=_first_name, last_name=_last_name, user_email=_email, user_password=hashed_password,
                         user_image=user_image_path,
                         user_birthdate=_user_birthdate))
        db.session.commit()
        return jsonify(SUCCESS_MESSAGE['Data'])


# Create Database
with app.app_context():
    db.create_all()
    # db.drop_all()


@app.route('/profile-page', methods=['GET'])
@jwt_required()
def profilePage():
    token = get_jwt()
    user = get_userID(token)
    photo_des = app.config['UPLOADED_PHOTOS_DEST']
    return jsonify({
        'Data': {
            'response_data':
                {
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                    'email': user.user_email,
                    'userImage': f'http://localhost:5000/photos/{remove_path(user.user_image, photo_des)}',
                    'userBirthDate': user.user_birthdate,
                    'isAdmin': user.is_admin,
                }
        }
    })


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
                db.session.commit()
                access_token = create_access_token(identity=user.user_id)
                return jsonify({

                    'response_data':
                        {
                            'isError': False,
                        },
                    'jwt': access_token

                }
                )

        else:
            return jsonify({
                'isError': True,
                'Data': {
                    'email': {'isError': is_login_email_dose_not_exist,
                              'msg': login_email_error(is_login_email_dose_not_exist)},
                }})


@app.route("/logout")
@login_required
def logout():
    updateLastLogin()
    updateIsOnline()
    db.session.commit()
    logout_user()
    return 'u are logged out'


@app.route('//register', methods=['POST'])
def register():
    _first_name = request.form['firstName']
    _last_name = request.form['lastName']
    _email = request.form['email']
    _password = request.form['password']
    _confirm_password = request.form['confirmPassword']
    _user_birthdate = request.form['userBD']

    existing_email = User.query.filter_by(user_email=_email).first()
    is_first_name_invalid = not validate_first_name(_first_name)
    is_last_name_invalid = not validate_last_Name(_last_name)
    is_email_invalid: bool = not validate_email(_email)
    is_exiting_email = existing_email is not None
    is_birth_date_invalid = not validate_birth_date(_user_birthdate)
    is_password_invalid = not validate_password(_password)
    is_password_confirmation_not_match = not check_password_match(_password, _confirm_password)

    _user_image = request.files['profileImage']
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

    photo_path = return_image(is_profile_image_empty, _user_image)

    new_user = User(_first_name, _last_name, _email, hashed_password, photo_path, _user_birthdate)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(SUCCESS_MESSAGE['Data'])


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
    'email_exists': 'Email already exists.',
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
    else:
        return "ok"


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


def return_image(is_profile_image_empty_, _user_image):
    if is_profile_image_empty_:
        return get_app_path() + app.config['DEFAULT_PHOTO'] + app.config['DEFAULT_PHOTO_NAME']
    else:
        photo = photos.save(_user_image)
        return basedir + '\\' + app.config['UPLOADED_PHOTOS_DEST'] + photo


######################################################################################

def validate_first_name(_first_name):
    if len(_first_name) < 3:
        return False
    else:
        return True


def validate_last_Name(_last_name):
    if len(_last_name) < 3:
        return False
    else:
        return True


def validate_email(_email):
    return re.match(r'[^@]+@[^@]+\.[^@]+', _email)


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


def get_userID(token):
    return User.query.filter_by(user_id=token['sub']).first()


def remove_path(file_with_path, path_to_be_removed):
    file_without_path = get_app_path() + path_to_be_removed
    return file_with_path.replace(file_without_path, "")


def get_app_path():
    return basedir + '\\'


def get_user_folder(user):
    folder_name = user.first_name + "_" + user.last_name + "_" + str(user.user_id)
    return folder_name


# Run server
if __name__ == '__main__':
    app.run(debug=True)
