import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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

    const doctorsComponents = doctors?.map((user) => {
      return (
        <li key={user.id}>
          <NavLink to={`/appointments/create/${user.id}`}>
            <div className='Doctor-info-container'>
              {`Dr. ${user.last_name}`}
            </div>
          </NavLink>
        </li>
      );
    });

    return (
        <section className='container'>
            <h2>Doctors List</h2>
            <ul>{doctorsComponents}</ul>
        </section>
    )
}

export default DoctorsList;
