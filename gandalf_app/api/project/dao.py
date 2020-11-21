from gandalf_app.database import db


def save(project):
    db.session.add(project)
    db.session.commit()
