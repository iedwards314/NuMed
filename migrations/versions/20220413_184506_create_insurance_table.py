"""create insurance table

Revision ID: 5631cfb562a5
Revises: ffdc0a98111c
Create Date: 2022-04-13 18:45:06.989071

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5631cfb562a5'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('insurance',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('insurance_co', sa.String(length=100), nullable=False),
    sa.Column('subscriber_num', sa.String(length=30), nullable=False),
    sa.Column('group_num', sa.String(length=30), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.Date(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=False),
    sa.Column('updated_at', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['doctor_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    # op.create_table('doctors',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('first_name', sa.String(length=100), nullable=False),
    # sa.Column('last_name', sa.String(length=100), nullable=False),
    # sa.Column('username', sa.String(length=40), nullable=False),
    # sa.Column('email', sa.String(length=255), nullable=False),
    # sa.Column('hashed_password', sa.String(length=255), nullable=False),
    # sa.Column('address', sa.String(length=255), nullable=False),
    # sa.Column('city', sa.String(length=60), nullable=False),
    # sa.Column('state', sa.String(length=50), nullable=False),
    # sa.Column('phone', sa.String(length=15), nullable=False),
    # sa.Column('doctor_id', sa.Integer(), nullable=True),
    # sa.Column('image', sa.String(length=255), nullable=True),
    # sa.Column('specialty', sa.String(length=150), nullable=True),
    # sa.PrimaryKeyConstraint('id'),
    # sa.UniqueConstraint('email'),
    # sa.UniqueConstraint('username')
    # )

    # id = db.Column(db.Integer, primary_key=True)
    # patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # doctor_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # description = db.Column(db.Text, nullable=False)
    # created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    # updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # patient = db.relationship("User", back_populates="appointment_patient")
    # doctor = db.relationship("User", back_populates="appointment_doctor")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('insurance')
    op.drop_table('appointments')
    # ### end Alembic commands ###
