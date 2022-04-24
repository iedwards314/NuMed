import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/DoctorsList.css'

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/doctors/');
        const responseData = await response.json();
        setDoctors(responseData.doctors);
      }
      fetchData();
    }, []);

    const doctorsComponents = doctors?.map((doctor) => {
      return (
        <li key={doctor.id} className='center-text specialty'>
          <NavLink className="specialty-nav-link" to={`/appointments/create/${doctor.id}`}>
            <div>
              <img className='specialty-image' src={`${doctor.image}`} alt={`Dr. {${doctor.last_name}`} />
              <div className='specialty-content'>
                <p className='specialty-name'>{`Dr. ${doctor.last_name}`}</p>
                <p className='specialty-description'>{`Care Specialty: ${doctor.specialty}`}</p>
              </div>
            </div>
          </NavLink>
        </li>
      );
    });

    return (
      <section className="section-specialties">
        <div className="container center-text">
          <h2 className="heading-secondary specialty-heading">Our Doctors Are Here to Help</h2>
          <p className="subheading">Click on the doctor to schedule</p>
        </div>
        <div className="container center-text">
          <ul className='margin-bottom-md center-text grid grid--3--cols'>{doctorsComponents}</ul>
        </div>
      </section>
    )
}

export default DoctorsList;
