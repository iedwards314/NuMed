from flask import Blueprint, jsonify, request
from app.models import Insurance_Policy, db
from sqlalchemy import any_, or_

insurance_routes = Blueprint('insurance', __name__)

@insurance_routes.route('/')
def get_policies():
    policies = Insurance_Policy.query.all()
    return {'insurance': [policy.to_dict() for policy in policies]}

@insurance_routes.route('/<int:id>')
def get_policy(id):
    policy = Insurance_Policy.query.get(id)
    return policy.to_dict()
