import { useState, useEffect} from "react";
import {format} from "timeago.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {userRequest} from '../requestMethods';
import {Link} from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  display:flex;
  flex-wrap: wrap;
  ${mobile({flexDirection:'column'})}
`;

const NoteContainer = styled.div`
  display:flex;
  height:300px;
  width:30.5%;
  box-shadow: 10px 10px 10px 2px rgba(235,235,235,1);
  margin-top: 20px;
  margin-left: 30px;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 7px;
  margin-bottom:20px;
  background-color:cornsilk;
  ${mobile({width:"80%", margin:"20px auto"})}
`
const Button = styled.button`
  border:none;
  background-color: cornsilk;
  cursor:pointer;
  &:hover {
    color:orangered;
  }
`

const Title = styled.h4`
  text-align: center;
  margin-bottom:0;
  ${mobile({fontSize:18})};
`

const Textwrapper = styled.div`
  flex:2;
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  ${mobile({overflow:"auto"})}
`

const Text = styled.p`
  margin-left: 20px;
`
const Created = styled.p`
  color:cornflowerblue;
  font-size: 14px;
  margin-left: 20px;
`
const Buttonwrapper = styled.div`
  display:flex;
  justify-content: space-between;
  margin: 0 20px 10px;
`
const Empty = styled.p`
  font-size: 32px;
  margin: 100px auto;
  color: #bbb;
  ${mobile({fontSize:"20px", margin: "30px auto"})}
`

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const userPresent = localStorage.getItem("persist:root");
  const userId = userPresent?JSON.parse(JSON.parse(userPresent).user)?.currentUser?._id:null;
  
  useEffect(() => {
    
    const getNotes = async() => {
      try{
        const res = await userRequest.post("/notes",
          {userId}
        );
        setNotes(res.data);
      }
      catch(err){
          console.log(err);
      }
  }
  getNotes();
},[userId]);

  const deleteNote = async(id) => {
      try{
          await userRequest.delete(`/notes/${id}`)
      }
      catch(err){
          console.log(err);
      }
  }

  return (
    <Container>
      <Wrapper>
        {notes.length>0?notes.map((note) => (
          <NoteContainer key={note._id}>
            <Title title={note.title}>{note.title}</Title>
            <Textwrapper>
              <Text>{note.content}</Text>
            </Textwrapper>
            <Created>Created {format(note.createdAt)}</Created>
            <Buttonwrapper>
              <Link to={`edit/${note._id}`} style={{color: 'black'}}>
                <EditIcon />
              </Link>
              <Button className="delete" onClick={() => deleteNote(note._id)}>
                <DeleteIcon/>
              </Button>
            </Buttonwrapper>
          </NoteContainer>
        )):<Empty>You have no notes yet.<Link to='/create' style={{color: 'goldenrod', textDecoration:'none'}}> Add a new note</Link></Empty>}
      </Wrapper>
    </Container>
  );
}
export default Notes;