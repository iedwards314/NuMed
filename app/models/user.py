from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(60), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    # Doctor specific fields
    doctor_id = db.Column(db.Integer(), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    specialty = db.Column(db.String(150), nullable=True)

    insurance_policies = db.relationship("Insurance_Policy", back_populates="user", cascade="all, delete")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        insuranceArr = []
        for policy in self.insurance_policies:
            insuranceArr.append({
                "id": policy.__dict__["id"],
                "insurance_co": policy.__dict__["insurance_co"],
                "subscriber_num": policy.__dict__["subscriber_num"],
                "group_num": policy.__dict__["group_num"],
            })

        #     {
        #     'id': self.id,
        #     'user_id': self.user_id,
        #     'insurance_co': self.insurance_co,
        #     'subscriber_num': self.subscriber_num,
        #     'group_num': self.group_num,
        # }

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'doctor_id': self.doctor_id,
            'image': self.image,
            'specialty': self.specialty,
            'insurance_policies': insuranceArr
        }
