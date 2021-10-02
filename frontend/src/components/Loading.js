import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

export default function Loading() {
    return (
        <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status" >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}
