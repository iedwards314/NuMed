import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setDoctors(responseData.users);
      }
      fetchData();
    }, []);

    const doctorsComponents = doctors.map((user) => {
      return (
        <li key={user.id}>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
        </li>
      );
    });

    return (
        <section>
            <h2>Doctors List</h2>
            <ul>{doctorsComponents}</ul>
        </section>
    )
}

export default DoctorsList;
