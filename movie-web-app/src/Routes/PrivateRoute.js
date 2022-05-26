import {
        Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux'


const PrivateRoute = ({ children }) => {
    let user = useSelector(state=>state.user)

    return user.data!=null ? children : <Navigate to="/login" />;
  }

export default PrivateRoute;