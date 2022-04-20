
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(60), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(15), nullable=False)

    insurance_policies = db.relationship("Insurance_Policy", back_populates="user", cascade="all, delete")

    # if "sends hashed_password data"
    @property
    def password(self):
        return self.hashed_password

    # hash all passwords
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):

        insurance_policies_dict = {}
        for policy in self.insurance_policies:
            # print("policy is...", policy)
            key=policy.__dict__["id"]
            insurance_policies_dict[key] = {
                "id": policy.__dict__["id"],
                "insurance_co": policy.__dict__["insurance_co"],
                "subscriber_num": policy.__dict__["subscriber_num"],
                "group_num": policy.__dict__["group_num"],
                "user_id":policy.__dict__["user_id"]
            }


        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'insurance_policies': insurance_policies_dict
        }
