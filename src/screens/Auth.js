import React , { useState , useEffect } from 'react';
import '../css/Login.css';
import { Link , useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';

// SnackBar

import Snackbar from '@mui/material/Snackbar';

function Auth() {
    
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const registerToken = () => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(name === null || email === null){
            setMsg("Please enter the email and name");
            setOpen(true);
        }else if(!regEmail.test(email)){
            setMsg("Invalid Email Format");
            setOpen(true);
        }else{
            const axios = require('axios').default;
            const data = {name:name,email:email};
            let axiosConfig = {
                headers: {
                    'Content-Type': 'text/plain'
                }
              };
            axios.post('http://localhost/Projects/Supermetrics/', data,axiosConfig)
            .then(function (response) {
                console.log(response);
                if(response.data.is_error == 1){
                    setMsg(response.data.msg);
                    setOpen(true);
                }else{
                    console.log(response)
                    localStorage.setItem('token',response.data.sl_token);
                    navigate('/home');
                }
            });
        }
    }

    const handleClose = (event, reason) => {
        setOpen(false)
    }

    return (
        <div className="login">
            <div className="login__form">
                <p className="title"><span className="company__name">Supermetrics</span> Analytics Portal</p>
                <label>Email</label>
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder="user@gmail" />
                <label>Name</label>
                <input onChange={e => setName(e.target.value)} type="text" placeholder="user" />
                <button onClick={registerToken}><CheckIcon />Register</button>   
            </div>
           
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
            />
        </div>
    )
}

export default Auth;
