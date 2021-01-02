from datetime import datetime
import enum
from gandalf_app.database import db
from gandalf_app import settings
from passlib.apps import custom_app_context as pwd_context
from gandalf_app.auth.jwt_auth import jwt, auth, confirm_email_jwt
from datetime import datetime
from flask import g, request, jsonify
import hashlib
import logging


class ProjectStatus(enum.Enum):
    DRAFT = 1
    PENDING = 2
    PARTIAL = 3
    COMPLETED = 4
    ERROR = 5

class SupportedDataType(enum.Enum):
    IMAGE = 1
    VIDEO = 2
    AUDIO = 3



class ResultType(enum.Enum):
    SINGLE = 1
    MULTI = 2


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    location = db.Column(db.String(50))
    status = db.Column(db.Enum(ProjectStatus))  # enum list
    data = db.relationship('Data', backref='owner_project')
    media = db.relationship('Media', backref='owner_project')
    analysis = db.relationship('Analysis', backref='owner_project')
    probes = db.relationship('UploadedMediaFile', backref='owner_project')
    references = db.relationship('UploadedMediaFile', backref='owner_project_of_references')
    additionalData = db.relationship('UploadedDataFile', backref='owner_project')
    results = db.relationship('ResultSummary', backref='owner_project')

    def __init__(self, name):
        self.name = name
        self.status = ProjectStatus.DRAFT
        self.media = []
        self.data = []
        self.analysis = []
        self.probes = []
        self.references = []
        self.additionalData = []
        self.results = []

    def __repr__(self):
        return '<Project %r>' % self.name


class UploadedMediaFile(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fileName = db.Column(db.String(50))
    location = db.Column(db.String(50))
    hash = db.Column(db.String())
    role = db.Column(db.String())
    thumbnailLocation = db.Column(db.String())
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    def __init__(self, fileName):
        self.fileName = fileName

    def __repr__(self):
        return '<UploadedMediaFile %r>' % self.fileName


class UploadedDataFile(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fileName = db.Column(db.String(50))
    hash = db.Column(db.String())
    location = db.Column(db.String(50))
    dataType = db.Column(db.String())
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    def __init__(self, fileName):
        self.fileName = fileName

    def __repr__(self):
        return '<UploadedDataFile %r>' % self.fileName


class ResultSummary(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    location = db.Column(db.String())
    # probes = TODO: definire lista, sarebbe una collection in java
    toolId = db.Column(db.Integer())
    name = db.Column(db.String())
    resultType = db.Column(db.Enum(ResultType))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<ResultSummary %r>' % self.name


class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String())
    #supportedDataTypes = db.ARRAY(db.String())
    #supportedDataFormats = db.ARRAY(db.String())
    #references = db.ARRAY(db.String())

    supportedDataTypes = db.Column(db.PickleType())
    supportedDataFormats = db.Column(db.PickleType())
    references = db.Column(db.PickleType())

    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.supportedDataTypes = []
        self.supportedDataFormats = []
        self.references = []

    def __repr__(self):
        return '<Tool %r>' % self.name


class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Media %r>' % self.name


class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Data %r>' % self.name


class Analysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    result = db.relationship('Result', backref='owner_analysis')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Analysis %r>' % self.name


class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    analysis_id = db.Column(db.Integer, db.ForeignKey('analysis.id'))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Result %r>' % self.name


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    public_id = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(64))
    user_role = db.Column(db.String(length=30), default='user')
    password_hash = db.Column(db.String(128))
    name = db.Column(db.String(64))
    location = db.Column(db.String(64))
    member_since = db.Column(db.DateTime(), default=datetime.now)
    last_seen = db.Column(db.DateTime(), default=datetime.now)
    is_active = db.Column(db.Boolean, default=False)
    avatar_hash = db.Column(db.String(32))

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.email is not None and self.avatar_hash is None:
            self.avatar_hash = hashlib.md5(
                self.email.encode('utf-8')).hexdigest()

    def __repr__(self):
        return '<User %r>' % self.username

    # crea un hash per la password (per non averla in chiaro)
    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    # controlla la password
    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    # genera un token token.
    def generate_auth_token(self, permission_level):

        # controlla se è admin.
        if permission_level == 1:

            # Generate un token per admin con flag 1.
            token = jwt.dumps({'email': self.email, 'admin': 1}).decode('ascii')

            # ritorna un admin flag.
            return token
        elif permission_level == 2:

            # genera un admin token con flag 2.
            token = jwt.dumps({'email': self.email, 'admin': 2}).decode('ascii')

            # ritorna un admin flag.
            return token

        # ritorna un normale user flag permission_level == 0
        token = jwt.dumps({'email': self.email, 'admin': 0}).decode('ascii')
        # jwt.make_header(header_fields=token)
        return token

    # genera un nuovo token di accesso da quello di refresh
    @staticmethod
    @auth.verify_token
    def verify_auth_token(token):
        # crea un global none user.
        g.user = None

        try:
            # carica token.
            data = jwt.loads(token)

        except Exception as why:
            logging.error(why)
            # se c'è un errore ritorna false
            return False

        # controlla se la mail e il permesso di admin sono nel hjwt
        if 'email' and 'admin' in data:
            # setta email dal jwt.
            g.user = data['email']

            # Set l'admin permission dal jwt.
            g.admin = data['admin']

            # ritorna true.
            return True
        # altrimenti se non verificato ritorna false.

        return False

    # genera un confirmation token.

    def generate_confirmation_token(self, email, username):

        return confirm_email_jwt.dumps({'email': self.email, 'username': self.username}).decode('ascii')

    # controlla token

    @staticmethod
    def verify_confirm_token(confirm_token, confirm_email):
        try:

            data = confirm_email_jwt.loads(confirm_token)
            print(('s', confirm_email))
            # se il token è scaduto,ritorna None
            if confirm_email == data['email']:
                user = User.query.filter_by(email=data['email']).first()

                # set is_activce a 1
                user.is_active = 1
                # print(user)
                db.session.add(user)
                db.session.commit()

                return True

        except Exception as why:
            logging.info("User email confirmation failed, token may have expired " + str(why))
            print("token exp.....")
            return None
        else:
            return False

    # ottiene reset token
    def generate_reset_token(self):

        return jwt.dumps({'reset': self.id}).decode('ascii')
