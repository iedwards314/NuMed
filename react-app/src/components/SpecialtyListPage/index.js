import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const SpecialtyList = () => {

    const [doctors, setDoctors] = useState([]);
    const {specialty} = useParams() //string

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

    return(
        <section>
            <h2>Specialty Doctor List</h2>
            {doctorsComponents}
        </section>
    )
}

export default SpecialtyList;
