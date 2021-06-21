import React, { useEffect, useState } from "react";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/auth/LogIn";
import Signup from "./pages/auth/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";
import Profile from "./pages/user/Profile";

import AddStudio from "./pages/studio/AddStudio";
import SingleStudio from "./pages/studio/SingleStudio";
import Studios from "./pages/studio/Studios";
import EditStudio from "./pages/studio/EditStudio";

import AddWork from "./pages/work/AddWork";
import Works from "./pages/work/Works";
import Artists from "./pages/artist/Artists";

export default function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        if (!accessToken) {
            return setIsLoading(false);
        }
        getLoggedIn(accessToken).then((res) => {
            if (!res.status) {
                return setIsLoading(false);
            }
            setUser(res.data.user);
            setIsLoading(false);
        });
    }, []);

    function handleLogout() {
        const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
        if (!accessToken) {
            setUser(null);
            return setIsLoading(false);
        }
        setIsLoading(true);
        logout(accessToken).then((res) => {
            if (!res.status) {
                // deal with error here
                console.error("Logout was unsuccessful: ", res);
            }
            localStorage.removeItem(CONSTS.ACCESS_TOKEN);
            setIsLoading(false);
            history.push("/");
            return setUser(null);
        });
    }

    function authenticate(user) {
        console.log("USER: ", user);
        setUser(user);
    }

    if (isLoading) {
        return <LoadingComponent />;
    }
    return (
        <div className="App">
            <Navbar handleLogout={handleLogout} user={user} />

            <Switch>
                <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
                <NormalRoute
                    exact
                    path={PATHS.SIGNUPPAGE}
                    authenticate={authenticate}
                    component={Signup}
                />
                <NormalRoute
                    exact
                    path={PATHS.LOGINPAGE}
                    authenticate={authenticate}
                    component={LogIn}
                />
                <ProtectedRoute
                    exact
                    path={PATHS.PROFILE}
                    component={Profile}
                    user={user}
                    authenticate={authenticate}
                />
                <ProtectedRoute
                    exact
                    path={PATHS.ADD_STUDIO}
                    user={user}
                    component={AddStudio}
                    authenticate={authenticate}
                />
                <ProtectedRoute
                    exact
                    path={PATHS.SINGLE_STUDIO}
                    user={user}
                    component={SingleStudio}
                    authenticate={authenticate}
                    history={history}
                />
                <NormalRoute
                    exact
                    path={PATHS.STUDIOS}
                    user={user}
                    component={Studios}
                />
                <ProtectedRoute
                    exact
                    user={user}
                    path={PATHS.EDIT_STUDIO}
                    component={EditStudio}
                    authenticate={authenticate}
                />
                <ProtectedRoute
                    exact
                    path={PATHS.ADD_WORK}
                    user={user}
                    component={AddWork}
                    authenticate={authenticate}
                />
                <ProtectedRoute
                    exact
                    path={PATHS.WORKS}
                    user={user}
                    component={Works}
                    authenticate={authenticate}
                />
                <ProtectedRoute
                    exact
                    path={PATHS.ARTISTS}
                    user={user}
                    component={Artists}
                    authenticate={authenticate}
                />
            </Switch>
        </div>
    );
}
