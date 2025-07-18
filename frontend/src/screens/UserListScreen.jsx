import { LinkContainer } from 'react-router-bootstrap';
import { Table,Button } from 'react-bootstrap';
import { FaCheck,FaTrash,FaTimes,FaEdit } from 'react-icons/fa';
import { useGetAllUsersQuery,useDeleteUserMutation } from '../slices/usersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';


const UserListScreen = () => {

  const { data:users,refetch,isLoading,error } = useGetAllUsersQuery();

  const [ deleteUser,{ isLoading: loadingDelete } ] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('r u sure ?')) {
        try {
            await deleteUser(id);
            toast.success('User deleted');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    } else {
        
    }
  }

  return (
    <>
      <h1>Users</h1>
      { loadingDelete && <Loader/>}
      { isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table className='table-sm' striped hover responsive>
        <thead>
        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
        </thead>
                    <tbody>
                      { users.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                          <td>
                                {user.isAdmin ? (
                                    <FaCheck style={{ color: 'green' }} />
                                ) : (
                                    <FaTimes style={{ color: 'red' }} />
                                )}
                          </td>
                            <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <FaEdit/>
                                </Button>
                            </LinkContainer>
                            <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(user._id)}>
                                <FaTrash style={{color:'white'}}/>
                            </Button>
                            </td>
                        </tr>
                         ))}
                    </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen