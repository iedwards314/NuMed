from .db import db
from app.models.user import User
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from datetime import datetime

class Appointment(db.Model):
    __tablename__='appointments'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    start_time = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):

        doctor = User.query.get(self.doctor_id)
        doctor_dict = doctor.to_dict()
        doctor_info = {
            "dr_last_name": doctor_dict["last_name"],
            "dr_first_name": doctor_dict["first_name"],
            "dr_image": doctor_dict["image"],
            "dr_phone": doctor_dict["phone"],
            "dr_specialty": doctor_dict["specialty"],
            "dr_username": doctor_dict["username"],
        }

        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'doctor_info': doctor_info,
            'start_date': self.start_date,
            'start_time': self.start_time,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
