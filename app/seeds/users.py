from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        address='1234 Faker St',
        city='Seattle',
        state='Washington',
        phone='1234567890',
        doctor_id=False
        )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        address='1235 Faker St',
        city='Seattle',
        state='Washington',
        phone='2234567890',
        doctor_id=False)
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        address='1236 Faker St',
        city='Seattle',
        state='Washington',
        phone='3234567890',
        doctor_id=False)
    kristine = User(
        username='kristine',
        email='kristine@aa.io',
        password='password',
        address='1237 Faker St',
        city='Seattle',
        state='Washington',
        phone='4234567890',
        doctor_id=False)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kristine)

    db.session.commit()

    # username = db.Column(db.String(100), nullable=False, unique=True)
    # email = db.Column(db.String(255), nullable=False, unique=True)
    # hashed_password = db.Column(db.String(255), nullable=False)
    # address = db.Column(db.String(255), nullable=False)
    # city = db.Column(db.String(60), nullable=False)
    # state = db.Column(db.String(50), nullable=False)
    # phone = db.Column(db.String(15), nullable=False)
    # doctor_id = db.Column(db.Boolean(), nullable=False)


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
