from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def reset_database():
    import tool_example_app.database.models
    db.drop_all()
    db.create_all()
