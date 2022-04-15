from .db import db
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
from datetime import datetime

class Appointment(db.Model):
    __tablename__='appointments'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

# node_to_node = Table("node_to_node", Base.metadata,
#     Column("left_node_id", Integer, ForeignKey("node.id"), primary_key=True),
#     Column("right_node_id", Integer, ForeignKey("node.id"), primary_key=True)
# )

    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
