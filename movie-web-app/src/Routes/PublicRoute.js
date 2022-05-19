import {
    Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux'


const PublicRoute = ({ children }) => {
    let user = useSelector(state=>state.user)

return user.data==null ? children : <Navigate to="/" />;
}

export default PublicRoute;