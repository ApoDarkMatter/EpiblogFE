import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./styles.css"
import { useDispatch } from "react-redux";
import { setSearchVisible } from "../../reducers/blogPost";

const NewAuthor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bornDate, setBornDate] = useState();

  const dispatch = useDispatch()

  const formData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    bornDate: bornDate,
  };

  const [file, setFile] = useState(null);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (avatar) => {  
    const fileData = new FormData()
    fileData.append("avatar", avatar)
    
    // send the file to the server
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/authors/cloudUpload`,
        fileData
      );
      console.log("File caricato con successo:", response.data);
      return response.data;
    } catch (error) {
      console.log("Si è verificato un errore:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if the file is not null
    if (file) {
      try {
        // upload the file
        const uploadedFile = await uploadFile(file);
        console.log(uploadedFile);
        // add the cover to the formData
        const finalBody = {
          ...formData,
          avatar: uploadedFile.avatar
        };
        console.log("finalBody:", finalBody);
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/authors`,
          finalBody,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("Author created successfully:", response.data);
        setFile(null);
        console.log("uploadedFile:", uploadedFile);
      } catch (error) {
        console.log("Si è verificato un errore:", error);
      }
    } else {
      console.error("File non caricato");
    }
  };

  useEffect(() => {
    dispatch(setSearchVisible(false))
  }, [])

  return (
    <Container className="new-author-container">
      {/* setting the form encType */}
      <Form
        className="mt-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        >
        <Form.Group className="mt-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            size="lg"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            size="lg"
            placeholder="First Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password - (min 8 caracters)</Form.Label>
          <Form.Control
            type="password"
            size="lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Born Date - dd/mm/yyyy</Form.Label>
          <Form.Control
            size="lg"
            placeholder="BornDate"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            size="lg"
            placeholder="Avatar"
            onChange={onChangeSetFile}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Add
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewAuthor;
