import { useParams } from "react-router-dom";
import { SessionCheck, UserCheck } from "../../utils/user";
import HeaderFunc from "./header";
import ProfileBody from "./profileBody";
import "./styles/ProfilePage.css";

const ProfilePage = () => {
    const user = SessionCheck();
    const { userId } = useParams();
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
    } else{
        return (
            <h2 className="center-text">Unauthorized access 401</h2>
        )
    }

}

export default ProfilePage;
