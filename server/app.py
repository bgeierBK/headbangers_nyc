#!/usr/bin/env python3

from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, User, Venue, Review, Event, Photo

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

@app.get('/')
def index():
    return "Hello world"

@app.post('/api/signup')
def signup():
    try:
        new_user= User(
            username=request.json.get('username'),
            age=request.json.get('age'),
            email_address=request.json.get('email_address'),
            bio=request.json.get('bio')
        )

        new_user.hashed_password=request.json['password']
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406
    
@app.get('/api/users')
def get_users():
    return [user.to_dict() for user in User.query.all()], 200





# write your routes here! 
# all routes should start with '/api' to account for the proxy


if __name__ == '__main__':
    app.run(port=5555, debug=True)
