import { useState } from "react";
import {userRequest} from "../requestMethods";
import styled from "styled-components";
import Navbar from "./Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router";

const Container = styled.div``;

const Wrapper = styled.div`
    max-width:50%;
    box-shadow: 10px 10px 15px 2px rgba(120, 120, 115, 0.5);
    margin:70px auto;
    width:100%;
    padding: 20px;
    padding-top: 15px;
    border-radius: 7px;
    display:flex;
    flex-direction: column;
    ${mobile({width:"80%", margin:"30px auto"})}
`;
const Heading = styled.h3`
    text-align: center;
    margin: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border:transparent;
`;

const Button = styled.button`
  width:50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  border-radius:20px;
  color: white;
  margin:auto;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: turquoise;
    cursor: not-allowed;
  }
  &:hover{
    opacity:0.8;
  }
  ${mobile({fontSize:14, width:"70%", height:"30px", padding:"5px"})}
`;

const InputContainer = styled.div`
    width:100%;
    margin: 10px 0;
    
`

const Input = styled.input`
  width:100%;
  height: 20px;
  margin: 10px 0;
  border:none;
  border-bottom: 2px solid rgba(178, 182, 186,0.7);;
  outline: none;
  overflow: auto;
`;

const Label = styled.label`
    font-weight: 700;
`

const CreateNote = () => {
  const userPresent = localStorage.getItem("persist:root");
  const userId = userPresent?JSON.parse(JSON.parse(userPresent).user)?.currentUser?._id:"Not Available";
  const navigate = useNavigate();
  const [note, setNote] = useState({
      title: "",
      content: ""
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const create = async (e) => {
      e.preventDefault();
      try {
          const { title, content } = note;
          const createdNote = {
              title,
              content,
              userId
          };

          await userRequest.post("/notes/create", createdNote);
      }
      catch (err) {
          console.log(err);
      }
      navigate(-1);
  }
  return (
    <Container>
        <Navbar/>
        <Wrapper>
        <Heading>Create a Note</Heading>
        <Form onSubmit={create}>
            <InputContainer>
                <Label>Title</Label><br/>
                <Input type="text" placeholder="Title" value={note.title} name = "title" required onChange = {onChangeInput}/>
            </InputContainer>
            <InputContainer>
                <Label>Note</Label><br/>
                <Input type="text" placeholder="Write Notes here" value={note.content} name = "content" required rows = "2" onChange = {onChangeInput}/>
            </InputContainer>
            <Button type="submit">Create Note</Button>
        </Form>
        </Wrapper>

    </Container>
  )
}

export default CreateNote