import  { useState,useEffect } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { Row,Col,Form,Button } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [ name,setName ] = useState('');
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const [ cPassword,setCPassword ] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ register,{isLoading} ] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    },[userInfo,redirect,navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if ( password !== cPassword ) {
            toast.error('Passwords do not match');
            return;
        } else {
            try {
                const res = await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
        
    }

  return (
    <FormContainer>
    <h1>Sign Up</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name' className='my-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter your name.' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter a valid mail' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter a password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='cPassword' className='my-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Re-enter above password' value={cPassword} onChange={(e) => setCPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
            Register
        </Button>
        { isLoading && <Loader/>}
    </Form>
    <Row className='py-3'>
        <Col>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
    </Row>
</FormContainer>
  )
}

export default RegisterScreen