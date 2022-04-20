import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCheck } from "../../utils/user";
import { useParams } from "react-router-dom";
import { getAppointments } from "../../store/appointments";

const GetAllAppointments = () => {
  const user = SessionCheck();
  // console.log("user is...", user)
  const dispatch = useDispatch();
//   const [appts, setAppts] = useState({});
  const { userId } = useParams();

  const apptsObj = useSelector((state) => state?.appointments);
  let apptsArr;
  if(apptsObj){
      Object.values(apptsObj)
  }
  console.log("appts...", apptsArr)

//   useEffect(() => {
//     (async () => {
//       const response = await fetch(`/api/appointments/user/${userId}`);
//       const aptList = await response.json();
//       setAppts(aptList);
//     })();
//   }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getAppointments(userId));
}, [dispatch, userId])

if(apptsArr && apptsArr.length > 0){

    return (
      <>
        <ul>
          {apptsArr?.map((appt, idx) => {
            <li key={idx}><p>{appt.doctor_info?.dr_last_name}</p></li>;
          })}
        </ul>
      </>
    );
} else return ("hello")

};

export default GetAllAppointments;
