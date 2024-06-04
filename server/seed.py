#!/usr/bin/env python3

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
        
        User.query.delete()
        Venue.query.delete()
        Review.query.delete()
        Event.query.delete()
        Photo.query.delete()
        
        users = []
        venues = []
        reviews = []
        events = []
        photos = []

        u = User(username="Stu Redman", age=40, email_address="stu@redman.com", bio="Lover of all things country")
        u.hashed_password="password"
        users.append(u)

        u = User(username="Mother Abigail", age=101, email_address="mothe@abigail.com", bio="Love seeing my old-time music.")
        u.hashed_password="password"
        users.append(u)

        u = User(username="Larry Underwood", age=25, email_address="larry@underwood.com", bio="Baby can you dig your man?")
        u.hashed_password="password"
        users.append(u)

        u = User(username="Frances Goldsmith", age=19, email_address="frances@goldsmith.com", bio="NKOTB rocks!")
        u.hashed_password="password"
        users.append(u)

        u = User(username="Harold Lauder", age=21, email_address="harold@lauder.com", bio="Morrissey understands me")
        u.hashed_password="password"
        users.append(u)

        u = User(username="Nick Andros", age=21, email_address="nick@andros.com", bio="Big bass lets deaf people feel music")
        u.hashed_password="password"
        users.append(u)

        db.session.add_all(users)
        db.session.commit()

        v=Venue(name="Brooklyn Steel", address="319 Frost St., Brooklyn, NY 11222", burough="Brooklyn", website="https://www.bowerypresents.com/venues/brooklyn-steel", owner_user_id=1)
        venues.append(v)
        
        v=Venue(name="St. Vitus Bar", address="1120 Manhattan Ave, Brooklyn, NY 11222", burough="Brooklyn", website="https://www.saintvitusbar.com/")
        venues.append(v)

        v=Venue(name="Irving Plaza", address="17 Irving Pl. New York, NY 10003", burough="Manhattan", website="https://www.irvingplaza.com/")
        venues.append(v)

        v=Venue(name="Forest Hills Stadium", address="1 Tennis Pl., Forest Hills, NY 11375", burough="Queens", website="https://www.foresthillsstadium.com/", owner_user_id=3)
        venues.append(v)

        v=Venue(name="Bronx Music Hall", address="438 E 163rd St, Bronx, NY 10451", burough="The Bronx", website="https://www.bronxmusichall.org/")
        venues.append(v)

        v=Venue(name="St. George Theatre", address="35 Hyatt St, Staten Island, NY 10301", burough="Staten Island", website="https://stgeorgetheatre.com/", owner_user_id=2)
        venues.append(v)


        db.session.add_all(venues)
        db.session.commit()

        r=Review(stars=4, review_content="Great place to see a show!", user_id=1, venue_id=1)
        reviews.append(r)

        r=Review(stars=2, review_content="Drinks were weak and acoustics were awful.", user_id=3, venue_id=2)
        reviews.append(r)

        r=Review(stars=5, review_content="My favorite venus in the city!", user_id=4, venue_id=3)
        reviews.append(r)

        r=Review(stars=3, review_content="Solid joint, could use a bigger beer list", user_id=6, venue_id=4)
        reviews.append(r)

        r=Review(stars=1, review_content="Awful. Terrible sightlines and an unpleaseant staff", user_id=2, venue_id=5)
        reviews.append(r)

        r=Review(stars=5, review_content="Just incredible. A true hidden gem", user_id=2, venue_id=6)
        reviews.append(r)

        db.session.add_all(reviews)
        db.session.commit()

        e=Event(headliner="Neil Young and Crazy Horse", opening_acts= "Reverend Billy and his Stop Shopping Choir", user_id=1, venue_id=4)
        e.date=datetime(year=2024, month=6, day=15)
        events.append(e)

        e=Event(headliner="Charly Bliss", opening_acts= "Sad13", user_id=2, venue_id=2)
        e.date=datetime(year=2024, month=2, day=12)
        events.append(e)

        e=Event(headliner="A fake band", opening_acts= "Another fake band, another fake band", user_id=5, venue_id=3)
        e.date=datetime(year=2024, month=2, day=15)
        events.append(e)

        e=Event(headliner="Kendrick Lamar", opening_acts= "Drake", user_id=1, venue_id=1)
        e.date=datetime(year=2024, month=3, day=15)
        events.append(e)

        

        db.session.add_all(events)
        db.session.commit()



        print("Seeding complete!")
