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
    password = db.Column(db.String(32))

    # Constructor
    def __init__(self, username, password):
        self.username = username
        self.password = password

# Schema for json parsing
class UserSchema(ma.Schema):
    class Meta: 
        fields = ('id', 'username', 'password')

user_schema = UserSchema() # Fetch a single user
users_schema = UserSchema(many=True) # Fetch multiple user

# API
class UserManager(Resource):

    # Get user many or one
    @staticmethod
    def get():
        try: name = request.args['username'] # Check if the URL contain an ID
        except Exception as _: name = None

        if not name: # If there is no ID return back with every user
            users = User.query.all()
            return jsonify(users_schema.dump(users))
        user = User.query.filter_by(username=name).first() # Else return back the specific user
        return jsonify(user_schema.dump(user))

    @staticmethod
    def post():
        username = request.json['username']
        password = request.json['password']

        user = User(username, password)
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'Message': f'User {username} inserted.'
        })

    # Update an existing user
    @staticmethod
    def put():
        # If there is not have an ID return back an error
        try: id = request.args['username']
        except Exception as _: id = None
        if not id:
            return jsonify({ 'Message': 'Must provide the user ID' })
        user = User.query.filter_by(username=id).first() # Get user by ID

        username = request.json['username']
        password = request.json['password']

        user.username = username 
        user.password = password

        db.session.commit()
        return jsonify({
            'Message': f'User {username} altered.'
        })

    # Delete a specific user from database
    @staticmethod
    def delete():
        try: id = request.args['username']
        except Exception as _: id = None
        if not id:
            return jsonify({ 'Message': 'Must provide the user ID' })
        user = User.query.filter_by(username=id).first()

        db.session.delete(user)
        db.session.commit()

        return jsonify({
            'Message': f'User {str(id)} deleted.'
        })

api.add_resource(UserManager, '/api/users')

if __name__ == '__main__':
    app.run(debug=True)