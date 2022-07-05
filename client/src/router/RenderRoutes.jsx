// import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

const ROUTES = [
    {
        path: "/",
        key: "HOME",
        exact: false,
        component: Home,
        props: {},
        routes: [],
    },
    {
        path: "/login",
        key: "LOGIN",
        exact: true,
        component: Home,
        props: { login: true },
        routes: [],
    },
    {
        path: "/signup",
        key: "SIGNUP",
        exact: true,
        component: Home,
        props: { signup: true },
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
