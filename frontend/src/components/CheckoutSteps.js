import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Log-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place order</Col>
    </Row>
  );
}
