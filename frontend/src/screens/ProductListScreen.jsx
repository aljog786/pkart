import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row,Col,Table,Button } from 'react-bootstrap';
import { FaEdit,FaTrash } from 'react-icons/fa';
import { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation } from '../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Paginate from '../components/Paginate'
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductListScreen = () => {

    const {pageNumber} = useParams();

    const { data,refetch,isLoading,error } = useGetProductsQuery({pageNumber});

    const [ createProduct,{ isLoading: loadingCreate }] = useCreateProductMutation();

    const [ deleteProduct,{ isLoading: loadingDelete } ] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('r u sure ?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
    }
}
    
    const createProductHandler = async (id) => {
        if (window.confirm('do you want to create ?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } 
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
            <LinkContainer to={`/admin/product/addproduct`}>
        <Button className='btn-sm mx-2' variant='light'>
            <FaEdit/> Create Product
        </Button>
    </LinkContainer>
            </Col>
        </Row>

        { loadingCreate && <Loader/> }
        { loadingDelete && <Loader/> }

        { isLoading ? (
            <Loader/>
        ) : error ? (
            <Message variant='danger'>{error?.data?.message}</Message>
        ) : (
            <>
                <Table className='table-sm' striped hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm mx-2' variant='light'>
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{color:'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate page={data.page} pages={data.pages} isAdmin={true}/>
            </>
        )}
    </>
  )
}

export default ProductListScreen