// import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const ROUTES = [
    {
        path: "/",
        key: "HOME",
        exact: false,
        component: Home,
        props: { isLogin: false },
        routes: [],
    },
    {
        path: "/user",
        key: "HOME",
        exact: true,
        component: Home,
        props: { isLogin: true },
        routes: [],
    },
    {
        path: "/login",
        key: "LOGIN",
        exact: true,
        component: Login,
        props: {},
        routes: [],
    },
    {
        path: "/signup",
        key: "SIGNUP",
        exact: true,
        component: Signup,
        props: {},
        routes: [],
    },
];

export const RenderRoutes = ({ routes }) => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => {
                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            exact={route.exact}
                            element={<route.component {...route.props} />}
                        />
                    );
                })}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default ROUTES;
