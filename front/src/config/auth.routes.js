// Layout

import LayoutSession from "layouts/LayoutSession";

//Pages
import Error404 from 'pages/Error404'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Recovery from 'pages/Recovery'

const authRoutes = [
    {
        path: "/auth",
        component: LayoutSession,
        exact: false,
        routes: [
            {
                path: "/auth",
                component: Login,
                exact: true
            },
            {
                path: "/auth/register",
                component: Register,
                exact: true
            },
            {
                path: "/auth/recovery",
                component: Recovery,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
]

export default authRoutes