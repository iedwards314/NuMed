from flask.cli import AppGroup
from .users import seed_users, undo_users
# from .doctors import seed_doctors
from .insurance import seed_insurance, undo_insurance
from .appointments import seed_Appointments, undo_Appointments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_insurance()
    seed_Appointments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_insurance()
    undo_Appointments()
    # Add other undo functions here
