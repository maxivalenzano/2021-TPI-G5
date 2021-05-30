// Layout
import LayoutBasic from "layouts/LayoutBasic";

//Pages
import About from 'pages/About'
import Profile from 'pages/Profile'
import Contact from 'pages/Contact'
import Home from 'pages/Home'
import Sales from 'pages/Sales'
import DebtStatus from 'pages/DebtStatus'
import Report from 'pages/Report'
import Error404 from 'pages/Error404'

const routes = [
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                path: "/profile",
                component: Profile,
                exact: true
            },
            {
                path: "/about-us",
                component: About,
                exact: true
            },
            {
                path: "/sales",
                component: Sales,
                exact: true
            },
            {
                path: "/status",
                component: DebtStatus,
                exact: true
            },
            {
                path: "/report",
                component: Report,
                exact: true
            },
            {
                component: Error404
            }
        ]

    },
]

export default routes