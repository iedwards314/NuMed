from .db import db
from sqlalchemy.sql import func
# from sqlalchemy import DateTime

class Appointment(db.Model):
    __tablename__='appointments'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    patient = db.relationship("User", back_populates="appointment_patient")
    doctor = db.relationship("User", back_populates="appointment_doctor")

    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
