from flask import Blueprint, jsonify, request
from app.models import User, db
from sqlalchemy import any_, null, or_

doctor_routes = Blueprint('doctors', __name__)

@doctor_routes.route('/')
def get_doctors():
    """
    Returns a list of doctors for the doctors page

    """
    doctors = User.query.filter(User.doctor_id != None).all()
    return {'doctors': [doctor.to_dict_doctor() for doctor in doctors]}
