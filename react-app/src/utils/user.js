
import { useSelector } from 'react-redux';


export const SessionCheck = () => {
    const user = useSelector(state => state.session.user);
    return user;
}

export const UserCheck = (user, paramId) => {
    const userId = parseInt(paramId);
    return (user.id===userId);
}

export const DocCheck = (user) => {

    let doctor
    (user.doctor_id) ? doctor = true : doctor = false
    return doctor
}
