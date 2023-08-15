from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, LoginManager, UserMixin, login_user, login_required
from flask_cors import CORS
import secrets

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) #the default port of react app, since we have frontend on react

secret_key = secrets.token_hex(16)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:redoran16482@localhost:5432/Internship' #add your database settings here
app.config['JWT_SECRET_KEY'] = secret_key
app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app)
jwt = JWTManager(app)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)  # Changed from username to email
    password = db.Column(db.String(1000), nullable=False) #extended the string length because hashing method is changed to scrypt
    organization = db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=True)

    def serialize(self):
        return{
            'id': self.id,
            'email': self.email,
            'organization': self.organization
        }

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    users = db.relationship('User', backref='organization_id', lazy=True)

with app.app_context():
    db.create_all() 

@app.route('/')
def hello():
    return('Hello World')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='scrypt')
    new_user = User(email=data['email'], password=hashed_password)  # Modified here
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created!"}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()  # Modified here
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials!"}), 401
    access_token = create_access_token(identity=user.email)  # Use email as identity
    login_user(user)
    print(current_user.email)
    return jsonify({"access_token": access_token})

@app.route('/create-org', methods=['POST'])
@jwt_required()
def create_org():
    data = request.get_json()
    active_user_email = get_jwt_identity()
    active_user = User.query.filter_by(email=active_user_email).first()
    new_org = Organization(name = data['organization'])
    db.session.add(new_org)
    db.session.commit()
    active_user.organization = new_org.id
    db.session.commit()
    return jsonify({"message": "Organization created"}), 201

@app.route('/add-to-org', methods=['POST'])
@jwt_required()
def user_add():
    data = request.get_json()
    active_user_email = get_jwt_identity()
    active_user = User.query.filter_by(email=active_user_email).first()
    print(active_user)
    if active_user.organization:
        user_to_add = User.query.filter_by(email=data['userToOrg']).first()
        if user_to_add:
            user_to_add.organization = active_user.organization
            db.session.commit()
            return jsonify(f'User {user_to_add.email} successfully added to {user_to_add.organization}')
        else:
            return jsonify({'message': 'No such user'})
    else:
        return jsonify({'message': "No such organization"})
    
@app.route('/all-users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_list = [{'id': user.id, 'email': user.email, 'organization': user.organization_id.name} for user in users]
    return jsonify({'users': users_list})
    





if __name__ == '__main__':
    app.run()