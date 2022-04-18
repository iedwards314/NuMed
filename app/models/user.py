
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

appointment_relation = db.Table(
    'appointment_relation',
    db.Column('patient_id', db.Integer, db.ForeignKey("users.id")),
    db.Column('doctor_id', db.Integer, db.ForeignKey("users.id"))
)

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

    # Doctor specific fields
    doctor_id = db.Column(db.Integer(), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    specialty = db.Column(db.String(150), nullable=True)

    insurance_policies = db.relationship("Insurance_Policy", back_populates="user", cascade="all, delete")

    appointments = db.relationship(
        "Appointment",
        secondary="appointment_relation",
        primaryjoin=(appointment_relation.c.patient_id == id),
        secondaryjoin=(appointment_relation.c.doctor_id == id),
        backref=db.backref("doctors", lazy="dynamic"),
        lazy="dynamic"
    )

    # appointment_patient = db.relationship("Appointment", backref="patient")
    # appointment_doctor = db.relationship("User", backref="doctor")


# class Node(Base):
#     __tablename__ = 'node'
#     id = Column(Integer, primary_key=True)
#     label = Column(String)
#     right_nodes = relationship("Node",
#                         secondary=node_to_node,
#                         primaryjoin=id==node_to_node.c.left_node_id,
#                         secondaryjoin=id==node_to_node.c.right_node_id,
#                         backref="left_nodes"
#     )

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
        # insuranceArr = []
        # for policy in self.insurance_policies:
        #     insuranceArr.append({
        #         "id": policy.__dict__["id"],
        #         "insurance_co": policy.__dict__["insurance_co"],
        #         "subscriber_num": policy.__dict__["subscriber_num"],
        #         "group_num": policy.__dict__["group_num"],
        #     })

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
            'doctor_id': self.doctor_id,
            'image': self.image,
            'specialty': self.specialty,
            'insurance_policies': insurance_policies_dict
        }

    def to_dict_doctor(self):
        """
        To dict method for doctor object creation (removed address and insurance)
        """
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'city': self.city,
            'state': self.state,
            'phone': self.phone,
            'doctor_id': self.doctor_id,
            'image': self.image,
            'specialty': self.specialty,
        }
