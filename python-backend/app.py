# pip install Flask
from flask import Flask, request, jsonify
# pip install -U Flask-SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
# pip install -U Flask-Marshmallow
from flask_marshmallow import Marshmallow 
# pip install flask-restful
from flask_restful import Resource, Api
# pip install marshmallow-sqlalchemy

app = Flask(__name__) 
api = Api(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app) 
ma = Marshmallow(app)

# Create user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    role = db.Column(db.String(32))

    # Constructor
    def __init__(self, username, role):
        self.username = username
        self.role = role

# Schema for json parsing
class UserSchema(ma.Schema):
    class Meta: 
        fields = ('id', 'role')

user_schema = UserSchema() # Fetch a single user
users_schema = UserSchema(many=True) # Fetch multiple user

class UserManager(Resource):
    @staticmethod
    def get():
        try: id = request.args['id']
        except Exception as _: id = None

        if not id:
            users = User.query.all()
            return jsonify(users_schema.dump(users))
        user = User.query.get(id)
        return jsonify(user_schema.dump(user))

    @staticmethod
    def post():
        username = request.json['username']
        password = request.json['password']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        age = request.json['age']

        user = User(username, password, first_name, last_name, age)
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'Message': f'User {first_name} {last_name} inserted.'
        })

    @staticmethod
    def put():
        try: id = request.args['id']
        except Exception as _: id = None
        if not id:
            return jsonify({ 'Message': 'Must provide the user ID' })
        user = User.query.get(id)

        username = request.json['username']
        password = request.json['password']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        age = request.json['age']

        user.username = username 
        user.password = password 
        user.first_name = first_name 
        user.last_name = last_name
        user.age = age 

        db.session.commit()
        return jsonify({
            'Message': f'User {first_name} {last_name} altered.'
        })

    @staticmethod
    def delete():
        try: id = request.args['id']
        except Exception as _: id = None
        if not id:
            return jsonify({ 'Message': 'Must provide the user ID' })
        user = User.query.get(id)

        db.session.delete(user)
        db.session.commit()

        return jsonify({
            'Message': f'User {str(id)} deleted.'
        })