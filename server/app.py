#!/usr/bin/env python3

from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import User, Venue, Review, Event, Photo
from config import app, db, bcrypt, os
from datetime import datetime
from werkzeug.utils import secure_filename
import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
    cloud_name='dxtkrqdmo',
    api_key = '562345124685953',
    api_secret = '4pgVbgO8NdaOWgR7Zdz9GQ4Qaso'


)





@app.post('/api/users')
def create_user():
    try:
        new_user= User(
            username=request.json.get('username'),
            age=request.json.get('age'),
            email_address=request.json.get('email_address'),
            bio=request.json.get('bio')
        )
        new_user.hashed_password=request.json.get('password')
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406
    
@app.get("/api/check_session")
def check_session():
    if 'user_id' in session:
        user = User.query.where(User.id == session['user_id']).first()
        if user:
            return user.to_dict(), 200
        else: 
            return {'error': 'user not found'}, 404
    else: 
        return {'error': 'no active session'}, 204

@app.post('/api/login')
def login():
    user = User.query.where(User.username == request.json.get('username')).first()
    if user and bcrypt.check_password_hash(user._hashed_password, request.json.get('password')):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'error': 'Username or password was invalid'}

@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204

## user routes

@app.get('/api/users')
def get_users():
    return [user.to_dict(rules={'-reviews'}) for user in User.query.all()], 200

@app.get('/api/users/<int:id>')
def get_one_user(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.to_dict(rules={'reviews', 'events'})), 200
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


##venue routes

@app.get('/api/venues')
def get_venues():
    return [venue.to_dict(rules={"events", "-owner_user", "reviews", "photos"}) for venue in Venue.query.all()], 200

@app.get('/api/venues/<int:id>')
def get_one_venue(id):
    venue = Venue.query.where(Venue.id == id).first()
    if venue:
        return venue.to_dict(rules={"-events", "-owner_user"}), 200
    return {}, 404

@app.patch('/api/venues/<int:id>')
def update_venue(id):
    data= request.get_json()
    venue = Venue.query.get(id)
    if not venue:
        return jsonify({'error': 'Venue not found'}), 404
    allowed_fields={'name', 'address', 'burough', 'website', 'lgbtq_score', 'safety_score', 'owner_user_id'}
    try:
        for key, value in data.items():
            if key in allowed_fields:
                setattr(venue, key, value)
            else:
                return jsonify({'error': f'Field "{key}" cannot be updated'}), 400
        db.session.commit()
        return jsonify(venue.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

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
            review_content=request.json.get('review_content'),
            user_id = request.json.get('user_id'), 
            venue_id=request.json.get('venue_id')
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
        date_string = request.json.get('date')
        date_object = datetime.strptime(date_string, '%Y-%m-%d')

        new_event= Event(
            headliner=request.json.get('headliner'),
            opening_acts=request.json.get('opening_acts'),
            date= date_object,
            user_id=request.json.get('user_id'),
            venue_id=request.json.get('venue_id')

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

@app.delete('/api/photos/<int:id>')
def delete_photo(id):
    photo = Photo.query.where(Photo.id == id).first()
    if photo:
        db.session.delete(photo)
        db.session.commit()
        return {}, 204
    return {}, 404  

@app.post('/api/photos')
def add_photo():
    data = request.get_json()
    url = data.get('file')
    user_id = data.get('user_id')
    venue_id = data.get('venue_id')
    event_id = data.get('event_id')

    if not url:
        return jsonify({'error': 'no photo url provided'}), 400
    
    new_photo= Photo(
        url=url,
        user_id=user_id,
        venue_id=venue_id,
        event_id=event_id
    )
    db.session.add(new_photo)
    db.session.commit()

    return jsonify(new_photo.to_dict())
        






# write your routes here! 
# all routes should start with '/api' to account for the proxy


if __name__ == '__main__':
    app.run(port=5555, debug=True)
