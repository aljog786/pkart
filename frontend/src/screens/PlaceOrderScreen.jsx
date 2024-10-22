import { useEffect } from "react";
import { Row,Col,ListGroup,Button,Image,Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod){
            navigate('/payment');
            
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate]);
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>col1</Col>
            <Col md={4}>col2</Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen