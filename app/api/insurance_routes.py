from flask import Blueprint, jsonify, request
from app.models import Insurance_Policy, db
from sqlalchemy import any_, or_

insurance_routes = Blueprint('insurance', __name__)

@insurance_routes.route('/user/<int:id>')
def get_insurance_policies(id):
    insurance_policies = Insurance_Policy.query.filter(Insurance_Policy.user_id == id).all()
    #     contributions = Contribution.query.filter(Contribution.project_id == id).all()
    return {'insurance_policies': [insurance_policy.to_dict() for insurance_policy in insurance_policies]}

@insurance_routes.route('/<int:id>')
def get_insurance_policy(id):
    insurance_policy = Insurance_Policy.query.get(id)
    return insurance_policy.to_dict()
