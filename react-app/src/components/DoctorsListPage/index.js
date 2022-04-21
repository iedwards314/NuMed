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
        <li key={doctor.id} className='specialty'>
          <NavLink to={`/appointments/create/${doctor.id}`}>
            <div className='doctor-info-container'>
              <div className='doctor-image-container'>
                <img className='specialty-image' src={`${doctor.image}`} alt={`Dr. {${doctor.last_name}`} />
              </div>
              <div className='doctor-info'>
                <p>{`Dr. ${doctor.last_name}`}</p>
                <p>{`Care Specialty: ${doctor.specialty}`}</p>
              </div>
            </div>
          </NavLink>
        </li>
      );
    });

    return (
        <section className='container grid center grid--3--cols section-doctors'>
            <h2 className='heading-third specialty-heading'>Choose from list of well qualified physicians to assist you</h2>
            <div className='doctors-list-container'>
              <ul className='doctors-list'>{doctorsComponents}</ul>
            </div>
        </section>
    )
}

export default DoctorsList;
