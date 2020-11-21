from datetime import datetime
import enum
from gandalf_app.database import db
from gandalf_app import settings


class ProjectStatus(enum.Enum):
    DRAFT = 1
    PENDING = 2
    PARTIAL = 3
    COMPLETED = 4
    ERROR = 5


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    location = db.Column(db.String(50))
    status = db.Column(db.Enum(ProjectStatus))  # enum list
    data = db.relationship('Data', backref='owner_project')
    media = db.relationship('Media', backref='owner_project')
    analysis = db.relationship('Analysis', backref='owner_project')

    def __init__(self, name):
        self.name = name
        self.status = ProjectStatus.DRAFT

    def __repr__(self):
        return '<Project %r>' % self.name


class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def __init__(self, name):
        self.name = name

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
    username = db.Column(db.String(50))

    def __init__(self, username):
        self.username = username

    def __repr__(self):
        return '<User %r>' % self.username
