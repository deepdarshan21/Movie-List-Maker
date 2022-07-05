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