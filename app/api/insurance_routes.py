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

@insurance_routes.route('/create', methods=['POST'])
def create_project():
    data = dict(request.json)
    new_insurance_policy = Insurance_Policy(
        user_id = data['user_id'],
        insurance_co=data['insurance_co'],
        subscriber_num=data['subscriber_num'],
        group_num=data['group_num'],
    )

    db.session.add(new_insurance_policy)
    db.session.commit()
    return new_insurance_policy.to_dict()

@insurance_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_insurance_policy(id):
    data = dict(request.json)
    insurance_policy = Insurance_Policy.query.get(id)
    res = {"id": id}
    db.session.delete(insurance_policy)
    db.session.commit()
    return res

@insurance_routes.route('/edit/<int:id>', methods=["PUT"])
def edit_insurance_policy(id):
    insurance_policy = dict(request.json)
    # changed id to variable
    data = Insurance_Policy.query.get(insurance_policy[id])

    data.insurance_co = insurance_policy['insurance_co'],
    data.subsriber_num = insurance_policy['subsriber_num'],
    data.group_num = insurance_policy['group_num'],

    db.session.commit()
    return data.to_dict()
