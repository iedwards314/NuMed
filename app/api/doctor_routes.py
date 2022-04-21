from flask import Blueprint, jsonify, request
from app.models import User, appointment, db, Appointment
from sqlalchemy import any_, null, or_

doctor_routes = Blueprint('doctors', __name__)

@doctor_routes.route('/')
def get_doctors():
    """
    Returns a list of doctors for the doctors page

    """
    doctors = User.query.filter(User.doctor_id != None).all()
    return {'doctors': [doctor.to_dict_doctor() for doctor in doctors]}

@doctor_routes.route('/<id>')
def get_one_doctor(id):
    """
    Returns one doctor info
    """
    doctor = User.query.get(id)
    return doctor.to_dict_doctor()

@doctor_routes.route('/availability/<start_date>/doctor/<int:doctor_id>')
def get_one_doctor_availability(start_date, doctor_id):
    """
    Returns a schedule for a doctor with
    """

    # start_date = "2022-05-17"

    # doc_sched = Appointment.query.filter(Appointment.start_date == start_date).all()

    doc_sched = Appointment.query.filter(Appointment.start_date == start_date and Appointment.doctor_id == doctor_id)

    res = {'availability': [appt.to_dict_availability() for appt in doc_sched]}


    return res
