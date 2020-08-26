import React, { useState } from "react";
import { Row, Col, Form, Button, Small } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

export default function Register(props) {
    const [variables, setVariables] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, __) => props.history.push("/login"),
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
    });

    const submitRegisterForm = (e) => {
        e.preventDefault();

        registerUser({ variables });
    };

    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <div className="bg-white p-5 bg-radius">
                    <h1 className="text-center">Register</h1>

                    <Form onSubmit={submitRegisterForm}>
                        <Form.Group>
                            <Form.Label className={errors.email && "text-danger"}>
                                {errors.email ?? "Email address"}
                            </Form.Label>
                            <Form.Control
                                type="email"
                                value={variables.email}
                                className={errors.email && "is-invalid"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        email: e.target.value
                                    })
                                }
                                placeholder="Enter email"
                            />
                        </Form.Group>

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

                        <Form.Group>
                            <Form.Label
                                className={errors.confirmPassword && "text-danger"}>
                                {errors.confirmPassword ?? "Confirm Password"}
                            </Form.Label>
                            <Form.Control
                                type="password"
                                value={variables.confirmPassword}
                                className={errors.confirmPassword && "is-invalid"}
                                onChange={(e) =>
                                    setVariables({
                                        ...variables,
                                        confirmPassword: e.target.value
                                    })
                                }
                                placeholder="Confirm password"
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="success" type="submit" disabled={loading}>
                                {loading ? "loading..." : "Register"}
                            </Button>
                            <br />
                            <small>
                                Don't have an account? <Link to="/login">Login</Link>
                            </small>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        ) {
            username
            email
            createdAt
        }
    }
`;
