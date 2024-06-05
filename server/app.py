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

## session routes

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
    
@app.get("/api/check_session")
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter(User.id == user_id).first()
        if user:
            return user.to_dict(), 200
        return {'error': 'username not found'}, 404
    return {}, 401

@app.post('/api/login')
def login():
    user = User.query.filter(User.username == request.json['username']).first()
    if user == None:
        return {'error': 'username not found'}
    elif user.authenticate(request.json['password']):
        session['user_id'] = user.id
        return user.to_dict(), 200
    return {'error': 'wrong password'}, 401

@app.delete('/api/logout')
def logout():
    if session.get['user_id'] == None:
        return {}, 401
    session['user_id'] = None
    return {}, 204

## user routes

@app.get('/api/users')
def get_users():
    return [user.to_dict(rules={'-reviews'}) for user in User.query.all()], 200

@app.get('/api/users/<int:id>')
def get_one_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        return user.to_dict(rules={'-reviews'}), 200
    return {}, 404

@app.patch('/api/users/<int:id>')
def update_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        for key in request.json.keys():
            setattr(user,key,request.json[key])
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {}, 404

@app.delete('/api/users/<int:id>')
def delete_user(id):
    user = User.query.where(User.id == id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/api/users')
def add_user():
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

##venue routes

@app.get('/api/venues')
def get_venues():
    return [venue.to_dict(rules={"-events", "-owner_user", "-reviews"}) for venue in Venue.query.all()], 200

@app.get('/api/venues/<int:id>')
def get_one_venue(id):
    venue = Venue.query.where(Venue.id == id).first()
    if venue:
        return venue.to_dict(rules={"-events", "-owner_user", "-reviews"}), 200
    return {}, 404

@app.patch('/api/venues/<int:id>')
def update_venue(id):
    venue = Venue.query.where(Venue.id == id).first()
    if venue:
        for key in request.json.keys():
            setattr(venue,key,request.json[key])
        db.session.add(venue)
        db.session.commit()
        return venue.to_dict()
    return {}, 404

@app.delete('/api/venues/<int:id>')
def delete_venue(id):
    venue = Venue.query.where(Venue.id == id).first()
    if venue:
        db.session.delete(venue)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/api/venues')
def add_venue():
    try:
        new_venue= Venue(
            name=request.json.get('name'),
            address=request.json.get('address'),
            burough=request.json.get('burough'),
            website=request.json.get('website')
        )
        db.session.add(new_venue)
        db.session.commit()
        return new_venue.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406
    
    ##review routes

@app.get('/api/reviews')
def get_reviews():
    return [review.to_dict() for review in Review.query.all()], 200

@app.get('/api/reviews/<int:id>')
def get_one_review(id):
    review = Review.query.where(Review.id == id).first()
    if review:
        return review.to_dict(), 200
    return {}, 404

@app.patch('/api/reviews/<int:id>')
def update_review(id):
    review = Review.query.where(Review.id == id).first()
    if review:
        for key in request.json.keys():
            setattr(review,key,request.json[key])
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {}, 404

@app.delete('/api/reviews/<int:id>')
def delete_review(id):
    review = Review.query.where(Review.id == id).first()
    if review:
        db.session.delete(review)
        db.session.commit()
        return {}, 204
    return {}, 404

@app.post('/api/reviews')
def add_review():
    try:
        new_review= Review(
            stars=request.json.get('stars'),
            review_content=request.json.get('review_content')
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406

## event routes

@app.get('/api/events')
def get_events():
    return [event.to_dict() for event in Event.query.all()], 200

@app.get('/api/events/<int:id>')
def get_one_event(id):
    event = Event.query.where(Event.id == id).first()
    if event:
        return event.to_dict(), 200
    return {}, 404

@app.patch('/api/events/<int:id>')
def update_event(id):
    event = Event.query.where(Event.id == id).first()
    if event:
        for key in request.json.keys():
            setattr(event,key,request.json[key])
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    return {}, 404

@app.delete('/api/events/<int:id>')
def delete_event(id):
    event = Event.query.where(Event.id == id).first()
    if event:
        db.session.delete(event)
        db.session.commit()
        return {}, 204
    return {}, 404                             

@app.post('/api/events')
def add_event():
    try:
        new_event= Event(
            headliner=request.json.get('headliner'),
            opening_acts=request.json.get('opening_acts'),
            date=('date')
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406

#photo routes

@app.get('/api/photos')
def get_photos():
    return [photo.to_dict() for photo in Photo.query.all()], 200

@app.get('/api/photos/<int:id>')
def get_one_photo(id):
    photo = Photo.query.where(Photo.id == id).first()
    if photo:
        return photo.to_dict(), 200
    return {}, 404

@app.patch('/api/photos/<int:id>')
def update_photo(id):
    photo = Photo.query.where(Photo.id == id).first()
    if photo:
        for key in request.json.keys():
            setattr(photo,key,request.json[key])
        db.session.add(photo)
        db.session.commit()
        return photo.to_dict()
    return {}, 404

@app.delete('/api/events/<int:id>')
def delete_photo(id):
    photo = Photo.query.where(Photo.id == id).first()
    if photo:
        db.session.delete(photo)
        db.session.commit()
        return {}, 204
    return {}, 404  

@app.post('/api/events')
def add_photo():
    try:
        new_photo= Photo(
            file=request.json.get('file')
        )
        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406





# write your routes here! 
# all routes should start with '/api' to account for the proxy


if __name__ == '__main__':
    app.run(port=5555, debug=True)
