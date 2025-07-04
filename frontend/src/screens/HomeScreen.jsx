import { Row,Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { pageNumber,keyword } = useParams();
  const { data,isLoading,error } = useGetProductsQuery({keyword,pageNumber});
  return (
    <>
      {!keyword ? (
        <>
          <h1>Top Rated</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {Array.isArray(data?.products) ? (
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <Message variant="danger">Invalid product data format</Message>
            )}
          </Row>
          {data?.page && data?.pages && (
            <Paginate
              page={data.page}
              pages={data.pages}
              keyword={keyword ? keyword : ""}
            />
          )}
        </>
      )}
    </>
  );
}

export default HomeScreen;

// Path: frontend/src/components/Product.jsx