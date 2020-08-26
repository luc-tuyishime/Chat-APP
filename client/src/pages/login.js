import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export default function Login(props) {
    const [variables, setVariables] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
        onCompleted: (data) => {
            localStorage.setItem("token", data.login.token);
            props.history.push("/home");
        }
    });

    const submitLoginForm = (e) => {
        e.preventDefault();
        loginUser({ variables });
    };

    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <div className="bg-white p-5 bg-radius">
                    <h1 className="text-center">Login</h1>

                    <Form onSubmit={submitLoginForm}>
                        <Form.Group>
                            <Form.Label className={errors.username && "text-danger"}>
                                {errors.username ?? "Username"}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={variables.username}
                                className={errors.username && "is-invalid"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        username: e.target.value
                                    })
                                }
                                placeholder="Username"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className={errors.password && "text-danger"}>
                                {errors.password ?? "Enter password"}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={variables.password}
                                className={errors.password && "is-invalid"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        password: e.target.value
                                    })
                                }
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="success" type="submit" disabled={loading}>
                                {loading ? "loading..." : "Login"}
                            </Button>
                            <br />
                            <small>
                                Don't have an account?{" "}
                                <Link to="/register">Register</Link>
                            </small>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            email
            createdAt
            token
        }
    }
`;
