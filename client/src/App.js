import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";

import ApolloProvider from "./ApolloProvider";
import { AuthProvider } from "./context/auth";
import DynamicRoute from "./util/dynamicRoute";

import "./App.scss";

function App() {
    return (
        <ApolloProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Container className="pt-5">
                        <Switch>
                            <DynamicRoute exact path="/" component={Home} authenticated />
                            <DynamicRoute path="/register" component={Register} guest />
                            <DynamicRoute path="/login" component={Login} guest />
                        </Switch>
                    </Container>
                </BrowserRouter>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
