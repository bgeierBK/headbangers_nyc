from app import app
from models import User, Venue, Review, Event, Photo
from faker import Faker
from werkzeug.security import generate_password_hash
from config import db, bcrypt
from datetime import datetime

faker = Faker()


if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")
        
        Photo.query.delete()

        db.session.commit()