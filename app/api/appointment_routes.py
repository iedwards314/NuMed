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
