from .db import db

class Insurance_Policy(db.Model):
    __tablename__='insurance'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    insurance_co = db.Column(db.String(100), nullable=False)
    subscriber_num = db.Column(db.String(30), nullable=False)
    group_num = db.Column(db.String(30), nullable=False)

    user = db.relationship("User", back_populates="insurance_policies")

    # userId: patientId,
    # insurance_co: insuranceCo,
    # subscriber_num: subscriberNum,
    # group_num: groupNum

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'insurance_co': self.insurance_co,
            'subscriber_num': self.subscriber_num,
            'group_num': self.group_num,
        }
