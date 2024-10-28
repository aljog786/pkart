import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [ keyword,setKeyword ] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    }

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
        <Form.Control 
        className="mr-sm-2 ml-sm-5"
        text='text'
        name="q"
        value={keyword}
        placeholder="search Products..."
        onChange={(e) => setKeyword(e.target.value)}>
        </Form.Control>
        <Button
         className="p-2 mx-2"
         type="submit"
         variant="outline-light"
        ><FaSearch/></Button>
    </Form>
  )
}

export default SearchBox