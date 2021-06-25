import React from "react";

const RouteWithNavbar = ({ exact, to, path, component, ...componentProps }) => {
    const Component = component;

    return (
        <Route
            exact={exact}
            path={path}
            render={(props) => {
                return (
                    <>
                        <Navbar {...componentProps} />
                        <Component {...componentProps} />
                    </>
                );
            }}
        />
    );
};

export default RouteWithNavbar;
