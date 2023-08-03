import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({ children, isAllowed, redirectTo="/landing" }: any) => {  

    if(!isAllowed){
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />
}