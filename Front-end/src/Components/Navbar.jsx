import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../Redux/apiCalls'
import logo from '../NoterLogo.png'
import {useLocation} from "react-router-dom"

const Container = styled.div`
    height: 100px;
    /* background-color:coral; */
    border-bottom: 2px solid coral;
    ${mobile({height:"50px"})};
`
const Wrapper = styled.div`
    display: flex;
    padding:20px 15px;
    justify-content:space-between;
    align-items:center;
    ${mobile({padding:"10px 5px"})};
`
const Left = styled.div`
    flex: 1;
`
const Logo = styled.a`
text-decoration:none;
`

const Logoimg = styled.img`
    width:250px;
    height:70px;
    ${mobile({width:"130px",height:"40px"})};
`
const Right = styled.div`
    display:flex;
    flex:1;
    align-items:center;
    justify-content: flex-end;
    margin-right:20px;
    ${mobile({justifyContent:"flex-end",marginRight:"10px",flex:2})};
    
`
const Logout = styled.button`
color:black;
font-size:16px;
padding:0.25em 1em;
border:2px solid peachpuff;
text-decoration:none;
font-weight:bold;
margin-right: 20px;
background-color:palevioletred;
border-radius:5px;
cursor:pointer;
${mobile({fontSize:"12px"})};
&:hover {background-color:white;}
`

const Signup = styled.button`
color:white;
background-color:palevioletred;
font-size:1em;
padding:7px;
&:hover{
    background-color:palegoldenrod;
    color:black;
}
border-radius:15px;
text-decoration:none;
border:2px solid coral;
${mobile({fontSize:"12px"})};
`
const Greeting = styled.span`
    margin-right: 20px;
    font-size: 1em;
    font-weight: 600;
    ${mobile({fontSize:"12px", marginLeft:"5px", fontWeight:500,marginRight:"15px"})};
`
const CreateNote = styled.button`
    color:black;
    font-size:16px;
    padding:0.25em 1em;
    border:1px solid coral;
    background-color:palegoldenrod;
    border-radius: 5px;
    text-decoration:none;
    font-weight:bold;
    margin-right: 20px;
    cursor:pointer;
    ${mobile({fontSize:"12px"})};
    &:hover {
        background-color:white;
    }
`


const Navbar = () => {

    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const location = useLocation();
    const page = location.pathname.split('/')[1];
    const handleClick = ()=>{
        logout(dispatch)
        // navigate('/')
    }
    return (
        <Container>
            <Wrapper>
                <Left><Logo href = "/"><Logoimg src = {logo} alt ="NOTER"/></Logo></Left>
                {!user?(page==='register'?<Right><Signup as="a" href="/">Login</Signup>
                <Link to = '/'>
                </Link></Right>:<Right><Signup as="a" href="/register">Sign Up</Signup>
                <Link to = '/register'></Link></Right>)
                :(<Right><Greeting>Hi, {user.username}</Greeting>
                
                <Link to = '/create'><CreateNote>Add note</CreateNote></Link>
                <Logout onClick={handleClick}>Logout</Logout>
                </Right>)}
                
            </Wrapper>
        </Container>
    )
}
export default Navbar;