import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils.js";





const Login = () => {

    const [loginInfo,setLoginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        console.log(name,value);
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    console.log('LoginInfo ->',loginInfo)

    const handleLogin = async (e) =>{
        e.preventDefault();
        const {name ,email,password} = loginInfo;
        if( !email || !password){
            return handleError('Please Fill the required inputs')
        }
        try{
            const url = "http://localhost:8000/auth/login"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)

            });
            const result = await response.json();
            const {success,message,jwtToken,name,error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            } else if (error){
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success){
                handleError(message);
            }
            console.log(result);
        }catch(err){
            handleError(err);
        }
    }

 
  return (
    <>
      <div className="Login-container">
        <form onSubmit={handleLogin} className="Login-form">
          <h2 className="form-title">Login</h2>


          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} type="email" name="email" placeholder="Enter your email" value={loginInfo.email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="password" name="password" placeholder="Enter your password" value={loginInfo.password} />
          </div>

          <button className="Login-btn" type="submit">Login</button>

          <p className="form-footer">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
