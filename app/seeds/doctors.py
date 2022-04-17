# from pydoc import Doc
# from app.models import db, Doctor

# def seed_doctors():
#     dr_rodriguez = Doctor(
#         username='dr_rodriguez',
#         email='dr_rodriguez@numed.io',
#         password='password',
#         first_name='Angel',
#         last_name='Rodriguez',
#         address='1238 Faker St',
#         city='Dallas',
#         state='Texas',
#         phone='5234567890',
#         doctor_id='459',
#         image='https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='Primary')

#     dr_myers = Doctor(
#         username='dr_myers',
#         email='dr_myers@numed.io',
#         password='password',
#         first_name='Demo',
#         last_name='Meyers',
#         address='1239 Faker St',
#         city='Dallas',
#         state='Texas',
#         phone='6234567890',
#         doctor_id='460',
#         image='https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='Primary')

#     dr_ahmad = Doctor(
#         username='dr_ahmad',
#         email='dr_ahmad@numed.io',
#         password='password',
#         first_name='Scott',
#         last_name='Ahmad',
#         address='1240 Faker St',
#         city='Dallas',
#         state='Texas',
#         phone='7234567890',
#         doctor_id='461',
#         image='https://images.unsplash.com/photo-1612349316228-5942a9b489c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='Cancer')

#     dr_hidayat = Doctor(
#         username='dr_hidayat',
#         email='dr_hidayat@numed.io',
#         password='password',
#         first_name='Demo',
#         last_name='Hidayat',
#         address='1241 Faker St',
#         city='Dallas',
#         state='Texas',
#         phone='8234567890',
#         doctor_id='462',
#         image='https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='Weight')

#     dr_kwon = Doctor(
#         username='dr_kwon',
#         email='dr_kwon@numed.io',
#         password='password',
#         first_name='Demo',
#         last_name='Kwon',
#         address='1242 Faker St',
#         city='Dallas',
#         state='Texas',
#         phone='9234567890',
#         doctor_id='463',
#         image='https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='Heart')

#     dr_suzuki = Doctor(
#         username='dr_suzuki',
#         email='dr_suzuki@numed.io',
#         password='password',
#         address='1243 Faker St',
#         first_name='Demo',
#         last_name='Suzuki',
#         city='Dallas',
#         state='Texas',
#         phone='9234567891',
#         doctor_id='464',
#         image='https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='COVID19')

#     dr_smith = Doctor(
#         username='dr_smith',
#         email='dr_smith@numed.io',
#         password='password',
#         first_name='Demo',
#         last_name='Smith',
#         address='1244 Faker St',
#         city='Dallas',
#         state='Texas',
#         phone='9234567892',
#         doctor_id='465',
#         image='https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBzeWNob2xvZ2lzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
#         specialty='Stress')

#     db.session.add(dr_rodriguez)
#     db.session.add(dr_myers)
#     db.session.add(dr_ahmad)
#     db.session.add(dr_hidayat)
#     db.session.add(dr_kwon)
#     db.session.add(dr_suzuki)
#     db.session.add(dr_smith)

#     db.session.commit()

# def undo_users():
#     db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
#     db.session.commit()
