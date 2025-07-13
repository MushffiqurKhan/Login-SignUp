import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/home" element={<Home/>}/>

    </Routes>
    </div>
  );
}

export default App;
