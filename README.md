# NuMed

## Overview
NuMed is an app for patients to find and schedule appointments with doctors in specific specialties matching patient's needs. Patients can create an account, keep updated insurance information, and schedule doctors by specialty.

## Technologies Used
- Frontend
  - React
  - Redux
  - Javascript
  - HTML
  - CSS

- Backend
  - Flask
  - Python
  - PostgreSQL
  - SQLAlchemy

## NuMed Getting started Setup
### Dev Containers (M1 Users, follow this guide)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer.
3. Clone the repository (only this branch)
   ```bash
   git clone https://git@github.com:iedwards314/NuMed.git
   ```
4. Open the repo in VS Code.
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner.
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app.

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://git@github.com:iedwards314/NuMed.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |

## Features

### Insurance
Patients (users) after they have signed in to NuMed can create insurance information after filling out a form and store it in the app and it will be found in the profile page. On this page, patients can edit their insurance information to keep it up to date or even delete the insurance information.

### Appointments
Patients (users) after they have signed in to NuMed can create an appointment after filling out a form and see the appointment in the app (as well as past appointments). The list will be found in the my appointments page. On this page, patients can edit their appointment information by updating the date, the time, and the description of the appointment. Please note that updates specifically to the appointment description are not included as physicians are required to conduct a medical interview to comply with the hippocratic oath. As such any information in there can be updated when a patient sees the physician.

<br>

## Links to wiki documentation
https://github.com/iedwards314/NuMed/wiki
