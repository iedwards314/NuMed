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

@doctor_routes.route('/category/<specialty>')
def get_doctors_specialty(specialty):
    """
    Returns a list of doctors for the doctors page

    """
    doctors = User.query.filter(User.specialty == specialty).all()
    return {'doctors': [doctor.to_dict_doctor() for doctor in doctors]}

@doctor_routes.route('/<id>')
def get_one_doctor(id):
    """
    Returns one doctor info
    """
    doctor = User.query.get(id)
    return doctor.to_dict_doctor()
