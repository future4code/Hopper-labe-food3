import React from "react";
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({Component}) {
    const isLogged = !!localStorage.getItem('token-fourFoodA')
    return isLogged ? <Component/> : <Navigate to="/"/>
}