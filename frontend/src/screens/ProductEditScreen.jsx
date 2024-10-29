import { useEffect,useState} from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUpdateProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation } from '../slices/productsApiSlice';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';


const ProductEditScreen = () => {

    const {id: productId} = useParams();

    const [ name,setName ] = useState('');
    const [ price,setPrice ] = useState(0);
    const [ image,setImage ] = useState('');
    const [ brand,setBrand ] = useState('');
    const [ category,setCategory ] = useState('');
    const [ description,setDescription ] = useState('');
    const [ countInStock,setCountInStock ] = useState(0);
    
    const { data:product,refetch,isLoading,error } = useGetProductDetailsQuery(productId);

    const [ updateProduct,{ isLoading:loadingUpdate }] = useUpdateProductMutation();

    const [ uploadProductImage,{ isLoading:loadingUpload}] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setDescription(product.description);
            setCountInStock(product.countInStock);
        }
    },[product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }
        const result = await updateProduct(updatedProduct);
        if (result.error) {
           toast.error(result.error); 
        } else {
            toast.success('Product updated');
            refetch();
            navigate('/admin/productlist')
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }


  return (
    <>
        <Link className='btn btn-light my-3' to='/admin/productlist'>
            back
        </Link>
        <FormContainer>
           <h1>Edit Product</h1>
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
                <Form.Group className='my-2' controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage}></Form.Control>
                    <Form.Control type='file' label='choose file' onChange={uploadFileHandler}></Form.Control>
                    {loadingUpload && <Loader />}
                </Form.Group>
                <Form.Group className='my-2' controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter the brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                    type='category'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='countInStock'>
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter count in stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter the description of the product'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                    </Form.Control>
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

export default ProductEditScreen;

