from app import app, db

# to drop tables in database if necessary
def drop():
    with app.app_context():
        db.drop_all() 

drop() 