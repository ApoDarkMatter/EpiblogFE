import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import useSession from "../../hooks/useSession";
import { useDispatch } from "react-redux";
import { setSearchVisible } from "../../reducers/blogPost";


const Home = (props) => {

  const dispatch = useDispatch()

  const session = useSession()
  console.log(session)

  useEffect(() => {
    dispatch(setSearchVisible(true))
  }, [])
  

  return (
    <>
      <Container fluid="sm">
        <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
        <BlogList />
      </Container>
    </>
  );
};

export default Home;
