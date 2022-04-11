import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import Navbar from "./Navbar";

const Container = styled.div`
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  ${mobile({ marginTop:"30px", width: "75%", height: "90%", marginBottom:"30px"})}
  background-image: linear-gradient(to top, rgb(255, 208, 154), rgb(242, 112, 156));
  box-shadow: 0 10px 15px rgba(249, 159, 115, 1);
  border-radius:7px;
  align-items: center;
  margin: 50px auto;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 5px;
  border:none;
  outline: none;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  border-radius:7px;
  margin:10px auto;
  cursor: pointer;
  ${mobile({marginTop:"30px", width: "75%", height: "40px" })}
  &:hover{
    opacity: 0.7;
  }
`;

const PasswordCheck = styled.div`
  color:red;
  font-size: 14px;
  margin-top:20px;
  font-weight: 600;
`;

const Agreement = styled.label`
  display: block;
  padding-left: 15px;
  text-indent: -15px;
  font-size: 14px;
  color: black;
`;

const CheckBox = styled.input`
  width: 12px;
  height: 12px;
  padding: 0;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  cursor: pointer;
`;

const Success = styled.p`
  font-size: 16px;
  text-align: center;
`
const Failure = styled.p`
  font-size: 16px;
  color:red;
  text-align: center;
`

const Register = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accCreated, setAccCreated] = useState("");
  const handleClick = async (e) =>{
    e.preventDefault();
    const form = document.getElementById('form')
    form.reset();
    const res = await publicRequest.post('/auth/register',{
      username,
      email,
      password,
    })
    console.log(res.status);
    if (res.status === 201){
      setAccCreated(true);
    }
    else{
      setAccCreated(false);
    }
  }

  return (
    
    <Container>
      <Navbar/>
      <Wrapper>
        <Title>Create a New Account</Title>
        <Form id="form">
          <Input placeholder="name" required/>
          <Input placeholder="last name" />
          <Input placeholder="username" required onChange = {e=>setUserName(e.target.value)}/>
          <Input placeholder="email" required onChange = {e=>setEmail(e.target.value)}/>
          <Input type = "password" placeholder="password" required onChange = {e=>setPassword(e.target.value)} />
          <Input type = "password" placeholder="confirm password" required onChange = {e=>setConfirmPassword(e.target.value)}/>
          {password.length>=8 && confirmPassword.length>=1 && password!==confirmPassword?<PasswordCheck>Password and Confirm Password don't match</PasswordCheck>:<PasswordCheck/>}
          {password.length<8? <PasswordCheck>Password should contain atleast 8 characters</PasswordCheck>:<PasswordCheck/>}
          <Agreement style={{ marginTop: "10px" }}>
              <CheckBox
                type="checkbox"
                required
              />
              I have read and agree to the Privacy policy and Terms of Noter.
            </Agreement>
          <Button onClick = {handleClick}>CREATE ACCOUNT</Button>
        </Form>
      </Wrapper>
      {accCreated?<Success>Acoount Created Successfully. Proceed to <Link to='/' style={{ color:"steelblue", fontWeight:"bold"}}>Login</Link></Success>:accCreated===false?<Failure>Something went wrong. Please try again</Failure>:<></>}
    </Container>
  );
};

export default Register;