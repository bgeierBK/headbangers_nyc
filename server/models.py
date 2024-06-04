from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    _hashed_password = db.Column(db.String, nullable=False)
    email_address = db.Column(db.String, unique=True, nullable=False)
    bio = db.Column(db.String)
    

    reviews = db.relationship('Review', back_populates= 'user')
    events = db.relationship('Event', back_populates='user')
    photos = db.relationship('Photo', back_populates='user')
    owned_venue=db.relationship('Venue', back_populates='owner_user')

    serialize_rules=['-_hashed_password', '-reviews.user', '-events.user', '-photos.user', '-owned_venue.owner_user']

    @hybrid_property
    def hashed_password(self):
        raise AttributeError('Password hashes may not be viewed')
    
    @hashed_password.setter
    def hashed_password(self, password):
        hashed_password = bcrypt.generate_password_hash(
            (password).encode('utf-8'))
        self._hashed_password=hashed_password
    
    @validates('username')
    def validate_username(self, key, value):
        if len(value.strip().replace(' ', '_')) >= 5:
            return value.strip().replace(' ', '_')
        else:
            raise ValueError('Username must be at least five characters')
    
    @validates('age')
    def validate_age(self, key, value):
        if value == None or value >=13:
            return value
        else:
            raise ValueError("Must be at least 13 years old")
    
    @validates('email_address')
    def validate_email(self, key, value):
        if value == None or '@' in value:
            return value
        else:
            return ValueError('Not a valid email address')
    
    

class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues_table'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    burough = db.Column(db.String)
    website = db.Column(db.String)
    lgbtq_score = db.Column(db.Integer, default=0)
    safety_score = db.Column(db.Integer, default=0)
    owner_user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))

    reviews = db.relationship('Review', back_populates='venue')
    events = db.relationship('Event', back_populates = 'venue')
    photos = db.relationship('Photo', back_populates='venue')
    owner_user=db.relationship('User', back_populates='owned_venue')

    serialize_rules=['reviews.venue', '-events.venue', '-photos.venue', '-owner_user.owned_venue']

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews_table'

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer)
    review_content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venues_table.id'))

    user = db.relationship('User', back_populates = 'reviews')
    venue = db.relationship('Venue', back_populates = 'reviews')

    serialize_rules=['-user.reviews', '-venue.reviews']
   

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events_table'

    id = db.Column(db.Integer, primary_key=True)
    headliner = db.Column(db.String)
    opening_acts = db.Column(db.String)
    date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venues_table.id'))

    user = db.relationship('User', back_populates='events')
    venue = db.relationship('Venue', back_populates='events')
    photos = db.relationship('Photo', back_populates='event')

    serialize_rules=['-user.events', '-venue.events', '-photos.event' ]

class Photo(db.Model, SerializerMixin):
    __tablename__ = 'photos_table'

    id = db.Column(db.Integer, primary_key=True)
    file = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venues_table.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events_table.id'))

    user = db.relationship('User', back_populates="photos")
    venue = db.relationship('Venue', back_populates="photos")
    event = db.relationship('Event', back_populates="photos")

    serialize_rules=['-user.photos', '-venue.photos', '-event.photos']

    









