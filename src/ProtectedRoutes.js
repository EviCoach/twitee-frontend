import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const useAuth = () => {
    const { user } = useContext(UserContext);
    return user && user.loggedIn;
}
export default function ProtectedRoutes() {
    const location = useLocation();
    const isAuth = useAuth();
    
    return isAuth?<Outlet/>:(<Navigate to="/login" replace state={{from:location}}/>)
    
}