
import { useSelector } from 'react-redux';


export const SessionCheck = () => {
    const user = useSelector(state => state.session.user);
    return user;
}
