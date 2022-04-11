// import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import CreateNote from './Components/CreateNote';
import EditNote from './Components/EditNote';
// import {useSelector} from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  // const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path = "/register" element={<Register/>}/>
      <Route exact path = "/create" element={<CreateNote/>}/>
      <Route exact path = "/edit/:id" element={<EditNote/>}/>
      </Routes>
    </Router>
  );
}

export default App;
