import { useEffect,useState} from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUpdateUserMutation,useGetUserDetailsQuery } from '../slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';


const UserEditScreen = () => {

    const {id: userId} = useParams();

    const [ name,setName ] = useState('');
    const [ email,setEmail ] = useState('');
    const [ isAdmin,setIsAdmin ] = useState(false);
    
    const { data:user,refetch,isLoading,error } = useGetUserDetailsQuery(userId);

    const [ updateUser,{ isLoading:loadingUpdate }] = useUpdateUserMutation();


    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({userId,name,email,isAdmin});
            toast.success('User updated.');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }


  return (
    <>
        <Link className='btn btn-light my-3' to='/admin/userlist'>
            back
        </Link>
        <FormContainer>
           <h1>Edit User</h1>
           { loadingUpdate && <Loader/> }
           { isLoading ? (
            <Loader/>
           ) : error ? (
            <Message variant='danger'>{error}</Message>
           ) : (
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='isAdmin'>
                    <Form.Check 
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <Button 
                type='submit'
                variant='primary'
                className='my-2'>
                    Update
                </Button>
            </Form>
           )}
        </FormContainer>
    </>
  )
}

export default UserEditScreen