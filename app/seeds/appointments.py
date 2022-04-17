from app.models import db, Appointment

def seed_Appointments():
    appointment1 = Appointment(
        patient_id= 2,
        doctor_id= 1,
        start_time= "2022-05-17 10:00:00",
        description= "Annual Checkup"
        )

    appointment2 = Appointment(
        patient_id= 4,
        doctor_id= 1,
        start_time= "2022-05-17 09:00:00",
        description= "Annual Checkup"
        )

    appointment3 = Appointment(
        patient_id= 4,
        doctor_id= 11,
        start_time= "2022-05-17 09:00:00",
        description= "Stress Management visit"
        )


    db.session.add(appointment1)
    db.session.add(appointment2)
    db.session.add(appointment3)

    db.session.commit()

def undo_Appointments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
