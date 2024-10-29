import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCreateProductMutation, useUploadProductImageMutation } from '../slices/productsApiSlice';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const [createProduct, { isLoading, error }] = useCreateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
    try {
        const createdProduct = {
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        };
        // Send product data to backend
        await createProduct(createdProduct).unwrap();
        toast.success('Product created successfully');
        navigate('/admin/productlist');
    } catch (err) {
        toast.error(err?.data?.message || err.message || 'Failed to create product');
    }
    };
    
    

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success('Image added');
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/admin/productlist'>
                Back
            </Link>
            <FormContainer>
                <h1>Add Product</h1>
                {isLoading && <Loader />}
                {error && <Message variant='danger'>{error?.data?.message || error.message}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter product name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-2' controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-2' controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image URL'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <Form.Control type='file' label='Choose File' onChange={uploadFileHandler} />
                        {loadingUpload && <Loader />}
                    </Form.Group>

                    <Form.Group className='my-2' controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-2' controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-2' controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter count in stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-2' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Enter product description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-2'>
                        Add Product
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};

export default CreateProductScreen;


