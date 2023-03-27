import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import reCAPTCHA from "react-google-recaptcha"
import {AuthContext} from "../context/authContext";

export default function Login()
{
    const authContext = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const emailInput   = useRef();
    const passInput    = useRef();
    const buttonInput  = useRef();
    const captchaRef   = useRef(null)

    async function login(e) {
        e.preventDefault();
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();

        await axios.post(process.env.REACT_APP_API_URL, {token})
            .then(res => console.log(res))

            .catch((error) =>
            {
                console.log(error);
            }
        )

        if (password === '1234') {
            const token = 'TOKEN:LIJLASASDHAJKEDHIU';
            localStorage.setItem('email', email);
            localStorage.setItem('token', token);
            authContext.setAuth({email, token});
        } else {
            alert('wrong password');
        }
    }

    useEffect(()=>
    {
        emailInput.current.focus();
    },[])

    function emailKeyDown(e)
    {
        if (e.key === 'Enter')
        {
            passInput.current.focus();
        }
    }

    function passwordKeyDown(e)
    {
         if (e.key === 'Enter')
        {
            buttonInput.current.focus();
        }
    }

    return (
        <div className='container mt-2 mb-3'>
            <form>
                 <h1> Login </h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input ref={emailInput} onKeyDown={emailKeyDown} type="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input ref={passInput}
                           onKeyDown={passwordKeyDown}
                           type="password" value={password}
                           className="form-control"
                           id="exampleInputPassword1"
                           placeholder="Password"
                           onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef}/>
                <button  ref={buttonInput} className="btn btn-primary" onClick={login}> SEND </button>
            </form>
        </div>
    );
}