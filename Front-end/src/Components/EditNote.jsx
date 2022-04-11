import { useState, useEffect } from "react";
import {userRequest} from "../requestMethods";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import Navbar from "./Navbar";
import { mobile } from "../responsive";

const Container = styled.div``

const Wrapper = styled.div`
    display:flex;
    max-width: 50%;
    box-shadow: 10px 10px 15px 2px rgba(120, 120, 115, 0.5);
    width: 100%;
    margin: 70px auto;
    padding: 20px;
    padding-top: 15px;
    flex-direction: column;
    border-radius: 7px;
    ${mobile({margin:"30px auto", width:"80%"})}
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
  border: none;
  border-bottom:2px solid rgba(178, 182, 186,0.7);
  outline: none;
`;

const Label = styled.label`
    font-weight: 700;
`

const EditNote = () => {
  const location = useLocation();
  const noteId = location.pathname.split('/')[2];
  const navigate = useNavigate();
  const [note, setNote] = useState({
      title: "",
      content: "",
      id: "",
  });
  
  useEffect(() => {
    const getNote = async () => {
      if (noteId) {
        const res = await userRequest.get(`/notes/${noteId}`);
        setNote({
          title: res.data.title,
          content: res.data.content,
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [noteId]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };


  const edit = async (e) => {
      e.preventDefault();
      try {
          const { title, content, id } = note;
          const createdNote = {
              title,
              content
          };
          await userRequest.put(`/notes/${id}`, createdNote)
          navigate(-1);
      }
      catch (err) {
          console.log(err);
      }
  };
  return (
    <Container>
        <Navbar/>
        <Wrapper>
          <Heading>Edit Note</Heading>
          <Form onSubmit={edit}>
              <InputContainer>
                  <Label>Title</Label><br/>
                  <Input type="text" value={note.title} name = "title" required onChange = {onChangeInput}/>
              </InputContainer>
              <InputContainer>
                  <Label>Note</Label><br/>
                  <Input type="text" value={note.content} name = "content" required rows = "2" onChange = {onChangeInput}/>
              </InputContainer>
              <Button type="submit">Save Changes</Button>
          </Form>
        </Wrapper>

    </Container>
  )
}

export default EditNote;