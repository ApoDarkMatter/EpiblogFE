import { Outlet } from "react-router-dom"
import Login from "../views/login/login"

export const isAuth = () => {
    return JSON.parse(localStorage.getItem('loggedInUser'))
}

const ProtectedRoutes = () => {
    const auth = isAuth()

    return auth ? <Outlet /> : <Login/>
}

export default ProtectedRoutes