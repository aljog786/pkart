import { LinkContainer } from 'react-router-bootstrap';
import { Table,Button } from 'react-bootstrap';
import { FaCheck,FaTrash,FaTimes,FaEdit } from 'react-icons/fa';
import { useGetAllUsersQuery } from '../slices/usersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';


const UserListScreen = () => {

  const { data:users,refetch,isLoading,error } = useGetAllUsersQuery();

  const deleteHandler = (id) => {
    console.log('delete');
  }

  return (
    <>
      <h1>Users</h1>
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
                            <LinkContainer to={`/user/${user._id}/edit`}>
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