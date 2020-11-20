from gandalf_app.database import db
from gandalf_app.database.models import User


def post_project(data):
    name = data.get('name')
    user = User(name)
    db.session.add(user)
    db.session.commit()


def get_users():
    pass


def get_user():
    pass


def delete_user():
    pass

