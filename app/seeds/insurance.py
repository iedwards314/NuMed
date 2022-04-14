from app.models import db, Insurance


# Adds a demo user, you can add other users here if you want
def seed_insurance():
    aetna = Insurance(
        user_id='2',
        insurance_co='aetna',
        subcriber_num='11111111111111',
        group_num='1111111111A'
        )

    unitedHealth = Insurance(
        user_id='3',
        insurance_co='united health',
        subcriber_num='22222222222222',
        group_num='1111111111B'
        )

    anthem = Insurance(
        user_id='3',
        insurance_co='anthem',
        subcriber_num='33333333333333',
        group_num='1111111111C'
        )

    db.session.add(aetna)
    db.session.add(unitedHealth)
    db.session.add(anthem)

    db.session.commit()

    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # insurance_co = db.Column(db.String(100), nullable=False)
    # subcriber_num = db.Column(db.String(30), nullable=False)
    # group_num = db.Column(db.String(30), nullable=False)


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_insurance():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
