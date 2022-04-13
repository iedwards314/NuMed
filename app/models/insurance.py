from .db import db

class Insurance(db.model):
    __tablename__="insurance"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    insurance_co = db.Column(db.String(100), nullable=False)
    subcriber_num = db.Column(db.String(30), nullable=False)
    group_num = db.Column(db.String(30), nullable=False)

    # userId: patientId,
    # insurance_co: insuranceCo,
    # subscriber_num: subscriberNum,
    # group_num: groupNum
