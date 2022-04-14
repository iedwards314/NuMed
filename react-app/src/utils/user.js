
import { useSelector } from 'react-redux';


export const SessionCheck = () => {
    const user = useSelector(state => state.session.user);
    return user;
}

export const UserCheck = (user, paramId) => {
    const userId = parseInt(paramId);
    return (user.id===userId);
}
