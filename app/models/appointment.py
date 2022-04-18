from .db import db
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

# node_to_node = Table("node_to_node", Base.metadata,
#     Column("left_node_id", Integer, ForeignKey("node.id"), primary_key=True),
#     Column("right_node_id", Integer, ForeignKey("node.id"), primary_key=True)
# )

    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'doctor_id': self.doctor_id.name,
            'start_date': self.start_date,
            'start_time': self.start_time,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
