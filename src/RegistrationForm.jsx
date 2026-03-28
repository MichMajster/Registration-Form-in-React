import React, { useState, useRef, useEffect } from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

    //stany pól formularza
const RegistrationForm = () => {
    const [postal1, setPostal1] = useState("");
    const [postal2, setPostal2] = useState("");
    const [city, setCity] = useState(""); //np. Paradise, Arizona
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    //do przeskakiwania kursora
    const postal2Ref = useRef(null);
    const cityRef = useRef(null);
    const repeatPasswordRef = useRef(null);

    //czy haslo git
    const [validations, setValidations] = useState({
        length: false,
        lower: false,
        upper: false,
        digit: false,
        special: false,
        start: false
    });

    const isPasswordValid = Object.values(validations).every(Boolean);

    const validatePassword = (value) => {
        setValidations({
            length: value.length >= 8,
            lower: /[a-z]/.test(value),
            upper: /[A-Z]/.test(value),
            digit: /[0-9]/.test(value),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            start: /^[a-zA-Z0-9]/.test(value)
        });
    };


    
    //zmiana hasla
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        validatePassword(val);
        setRepeatPassword(""); //ustawia powtorz haslo na puste jesli sie zmieni pierwsze
    };

    const handlePostal1Change = (e) => {
        const val = e.target.value.replace(/\D/g, "").substring(0, 2);
        setPostal1(val);
        if (val.length === 2) postal2Ref.current.focus();
    };

    const handlePostal2Change = (e) => {
        const val = e.target.value.replace(/\D/g, "").substring(0, 3);
        setPostal2(val);
        if (val.length === 3) cityRef.current.focus();
    };

    return (
        <Container className="mt-5">
        {/* <Container fluid className="mt-5"> */}
            <h2 className="mb-4 text-center">Formularz rejestracji</h2>
            <Form>
                {/* KOD POCZTOWY */}
                <Form.Group className="mb-3">
                    <Form.Label>Kod pocztowy i miasto</Form.Label>
                    <Row>
                        <Col xs={2}>
                            <Form.Control
                                placeholder="XX"
                                value={postal1}
                                onChange={handlePostal1Change}
                                maxLength={2}
                            />
                        </Col>
                        <Col xs={1} className="text-center p-0 mt-1">-</Col>
                        <Col xs={2}>
                            <Form.Control
                                placeholder="YYY"
                                ref={postal2Ref}
                                value={postal2}
                                onChange={handlePostal2Change}
                                maxLength={3}
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                placeholder="Miasto"
                                ref={cityRef}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                {/* HASŁO */}
                <Form.Group className="mb-3">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password}
                        onChange={handlePasswordChange}
                        isInvalid={password.length > 0 && !isPasswordValid}
                        style={{ borderColor: password.length > 0 && !isPasswordValid ? 'red' : '' }}
                    />
                    <div className="mt-2" style={{ fontSize: '0.8rem' }}>
                        <p className={validations.length ? "text-success" : "text-danger"}>● Min. 8 znaków</p>
                        <p className={validations.lower && validations.upper ? "text-success" : "text-danger"}>● Mała i duża litera</p>
                        <p className={validations.digit ? "text-success" : "text-danger"}>● Cyfra</p>
                        <p className={validations.special ? "text-success" : "text-danger"}>● Znak specjalny</p>
                        <p className={validations.start ? "text-success" : "text-danger"}>● Zaczyna się od litery/cyfry</p>
                    </div>
                </Form.Group>

                {/* POWTÓRZ HASŁO */}
                <Form.Group className="mb-3">
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control 
                        type="password" 
                        ref={repeatPasswordRef}
                        value={repeatPassword}
                        disabled={!isPasswordValid} // blokada pola, jeśli hasło jest błędne
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {repeatPassword && repeatPassword != password && (
                        <small className="text-danger">Hasła nie są identyczne!</small>
                    )}
                </Form.Group>
            </Form>
        </Container>
    );
};

export default RegistrationForm;