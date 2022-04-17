from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='Demo',
        last_name='User',
        address='1234 Faker St',
        city='Dallas',
        state='Texas',
        phone='1234567890',
        )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        first_name='Marnie',
        last_name='Johnson',
        address='1235 Faker St',
        city='Dallas',
        state='Texas',
        phone='2234567890',)
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        first_name='Bobbie',
        last_name='Hill',
        password='password',
        address='1236 Faker St',
        city='Dallas',
        state='Texas',
        phone='3234567890',)
    kristine = User(
        username='kristine',
        email='kristine@aa.io',
        password='password',
        first_name='Kristine',
        last_name='Douglas',
        address='1237 Faker St',
        city='Dallas',
        state='Texas',
        phone='4234567890',)

    dr_rodriguez = User(
        username='dr_rodriguez',
        email='dr_rodriguez@numed.io',
        password='password',
        first_name='Angel',
        last_name='Rodriguez',
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
        first_name='Demo',
        last_name='Meyers',
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
        first_name='Scott',
        last_name='Ahmad',
        address='1240 Faker St',
        city='Dallas',
        state='Texas',
        phone='7234567890',
        doctor_id='461',
        image='https://images.unsplash.com/photo-1612349316228-5942a9b489c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Cancer')

    dr_hidayat = User(
        username='dr_hidayat',
        email='dr_hidayat@numed.io',
        password='password',
        first_name='Demo',
        last_name='Hidayat',
        address='1241 Faker St',
        city='Dallas',
        state='Texas',
        phone='8234567890',
        doctor_id='462',
        image='https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Weight')

    dr_kwon = User(
        username='dr_kwon',
        email='dr_kwon@numed.io',
        password='password',
        first_name='Demo',
        last_name='Kwon',
        address='1242 Faker St',
        city='Dallas',
        state='Texas',
        phone='9234567890',
        doctor_id='463',
        image='https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Heart')

    dr_suzuki = User(
        username='dr_suzuki',
        email='dr_suzuki@numed.io',
        password='password',
        address='1243 Faker St',
        first_name='Demo',
        last_name='Suzuki',
        city='Dallas',
        state='Texas',
        phone='9234567891',
        doctor_id='464',
        image='https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='COVID19')

    dr_smith = User(
        username='dr_smith',
        email='dr_smith@numed.io',
        password='password',
        first_name='Demo',
        last_name='Smith',
        address='1244 Faker St',
        city='Dallas',
        state='Texas',
        phone='9234567892',
        doctor_id='465',
        image='https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBzeWNob2xvZ2lzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        specialty='Stress')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kristine)
    db.session.add(dr_rodriguez)
    db.session.add(dr_myers)
    db.session.add(dr_ahmad)
    db.session.add(dr_hidayat)
    db.session.add(dr_kwon)
    db.session.add(dr_suzuki)
    db.session.add(dr_smith)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
