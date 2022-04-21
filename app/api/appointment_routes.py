from flask import Blueprint, jsonify, request
from app.models import Appointment, db
from sqlalchemy import any_, or_

appointment_routes = Blueprint('appointments', __name__)

@appointment_routes.route('/doctor/<int:id>')
def get_appointments_doctor(id):
    appointments = Appointment.query.filter(Appointment.doctor_id == id).all()
    return {'appointments': [appointment.to_dict() for appointment in appointments]}

@appointment_routes.route('/user/<int:id>')
def get_appointments_patient(id):
    appointments = Appointment.query.filter(Appointment.patient_id == id).all()
    return {'appointments': [appointment.to_dict() for appointment in appointments]}

    # return {'insurance_policies': [insurance_policy.to_dict() for insurance_policy in insurance_policies]}

@appointment_routes.route('/<int:id>')
def get_appointment(id):
    appointment = Appointment.query.get(id)
    return appointment.to_dict()

@appointment_routes.route('/create', methods=['POST'])
def create_appointment():
    data = dict(request.json)
    new_appointment = Appointment(

        patient_id = data['patient_id'],
        doctor_id = data['doctor_id'],
        start_date = data['start_date'],
        start_time = data['start_time'],
        description = data['description'],
    )

    db.session.add(new_appointment)
    db.session.commit()
    return new_appointment.to_dict()

@appointment_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    data = dict(request.json)
    appointment = Appointment.query.get(id)
    res = {"id": id}
    db.session.delete(appointment)
    db.session.commit()
    return res

@appointment_routes.route('/edit/<int:id>', methods=["PUT"])
def edit_appointment(id):
    appointment = dict(request.json)
    data = Appointment.query.get(id)

    data.start_date = appointment['start_date']
    data.start_time = appointment['start_time']
    data.description = appointment['description']

    db.session.commit()
    return data.to_dict()
