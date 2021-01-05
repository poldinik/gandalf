from datetime import datetime
import enum
from tool_example_app.database import db
from tool_example_app import settings
from passlib.apps import custom_app_context as pwd_context
from tool_example_app.auth.jwt_auth import jwt, auth, confirm_email_jwt
from datetime import datetime
from flask import g, request, jsonify
import hashlib
import logging


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
