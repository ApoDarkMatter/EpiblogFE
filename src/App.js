import "./App.css"
import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/newBlogPost/NewBlogPost";
import NewAuthor from "./views/newAuthor/newAuthor";
import Login from "./views/login/login"
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/newauthor" element={<NewAuthor />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/new" element={<NewBlogPost />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
