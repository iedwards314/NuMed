# from app.models import appointment
# from .db import db
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


# class Doctor(db.Model, UserMixin):
#     __tablename__ = 'doctors'

#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(100), nullable=False)
#     last_name = db.Column(db.String(100), nullable=False)
#     username = db.Column(db.String(100), nullable=False, unique=True)
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     hashed_password = db.Column(db.String(255), nullable=False)
#     address = db.Column(db.String(255), nullable=False)
#     city = db.Column(db.String(60), nullable=False)
#     state = db.Column(db.String(50), nullable=False)
#     phone = db.Column(db.String(15), nullable=False)
#     # Doctor specific fields
#     doctor_id = db.Column(db.Integer(), nullable=True)
#     image = db.Column(db.String(255), nullable=True)
#     specialty = db.Column(db.String(150), nullable=True)

#     appointment_doctor = db.relationship("User", backref="doctor")



#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

#     def to_dict(self):

#         return {
#             'id': self.id,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'username': self.username,
#             'email': self.email,
#             'address': self.address,
#             'city': self.city,
#             'state': self.state,
#             'phone': self.phone,
#             'doctor_id': self.doctor_id,
#             'image': self.image,
#             'specialty': self.specialty,
#         }
