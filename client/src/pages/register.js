import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function Register() {
    const [variables, setVariables] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const submitRegisterForm = (e) => {
        e.preventDefault();

        console.log("Variables ===>>", variables);
    };

    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <div className="bg-white p-5 bg-radius">
                    <h1 className="text-center">Register</h1>

                    <Form onSubmit={submitRegisterForm}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={variables.email}
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
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={variables.username}
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
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={variables.password}
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
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={variables.confirmPassword}
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
                            <Button variant="success" type="submit">
                                Register
                            </Button>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}
