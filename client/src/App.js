import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";

import ApolloProvider from "./ApolloProvider";

import "./App.scss";

function App() {
    return (
        <ApolloProvider>
            <BrowserRouter>
                <Container className="pt-5">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
