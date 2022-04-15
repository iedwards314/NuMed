from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        address='1234 Faker St',
        city='Dallas',
        state='Texas',
        phone='1234567890',
        )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        address='1235 Faker St',
        city='Dallas',
        state='Texas',
        phone='2234567890',)
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        address='1236 Faker St',
        city='Dallas',
        state='Texas',
        phone='3234567890',)
    kristine = User(
        username='kristine',
        email='kristine@aa.io',
        password='password',
        address='1237 Faker St',
        city='Dallas',
        state='Texas',
        phone='4234567890',)

    dr_rodriguez = User(
        username='dr_rodriguez',
        email='dr_rodriguez@numed.io',
        password='password',
        address='1238 Faker St',
        city='Dallas',
        state='Texas',
        phone='5234567890',
        doctor_id='459',
        image='https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Primary')

    dr_myers = User(
        username='dr_myers',
        email='dr_myers@numed.io',
        password='password',
        address='1239 Faker St',
        city='Dallas',
        state='Texas',
        phone='6234567890',
        doctor_id='460',
        image='https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Primary')

    dr_ahmad = User(
        username='dr_ahmad',
        email='dr_ahmad@numed.io',
        password='password',
        address='1240 Faker St',
        city='Dallas',
        state='Texas',
        phone='7234567890',
        doctor_id='461',
        image='https://images.unsplash.com/photo-1612349316228-5942a9b489c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Cancer')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kristine)
    db.session.add(dr_rodriguez)
    db.session.add(dr_myers)
    db.session.add(dr_ahmad)


    db.session.commit()

    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('username', sa.String(length=40), nullable=False),
    # sa.Column('email', sa.String(length=255), nullable=False),
    # sa.Column('hashed_password', sa.String(length=255), nullable=False),
    # sa.Column('address', sa.String(length=255), nullable=False),
    # sa.Column('city', sa.String(length=60), nullable=False),
    # sa.Column('state', sa.String(length=50), nullable=False),
    # sa.Column('phone', sa.String(length=15), nullable=False),
    # sa.Column('doctor_id', sa.Integer(), nullable=True),
    # sa.Column('image', sa.String(length=255), nullable=True),
    # sa.Column('specialty', sa.String(length=150), nullable=True),


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
