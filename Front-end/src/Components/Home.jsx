import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Notes from './Notes';
import Login from './Login';
import { useSelector } from 'react-redux';

const Container = styled.div``;
const Heading = styled.h2`
  color:goldenrod;
  text-align:center;
`

const Home = () => {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Container>
      <Navbar/>
      {user?<Heading>Your Notes</Heading>:<></>}
      {user?<Notes/>:<Login/>}
    </Container>
  )
}

export default Home;