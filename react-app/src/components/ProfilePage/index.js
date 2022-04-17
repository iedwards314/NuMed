import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { UserCheck } from "../../utils/user";
import HeaderFunc from "./header";
import ProfileBody from "./profileBody";
import "./styles/ProfilePage.css";

const ProfilePage = () => {

    const [user, setUser] = useState({});
    const { userId }  = useParams();

    // console.log("user in 'profile page index'...", user);

    useEffect(() => {
      if (!userId) {
        return;
      }
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
      })();
    }, [userId]);

    if (!user) {
      return null;
    }

    const userCheck = UserCheck(user, userId);

    if(userCheck){
        return(
            <>
                <main>
                    <HeaderFunc />
                    <ProfileBody user={user} />
                </main>
            </>
        )
    }
    else{
        return (
            <h2 className="center-text">Unauthorized access 401</h2>
        )
    }

}

export default ProfilePage;
