from app import app, db

# to make initial migrations
def create():
    with app.app_context():
        db.create_all()

create()