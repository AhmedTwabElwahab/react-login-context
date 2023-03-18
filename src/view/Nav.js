import {useContext} from "react";
import {AuthContext} from "../context/authContext";

function Nav()
{
    const authContext = useContext(AuthContext);

    function Logout()
    {
        localStorage.clear();
        authContext.setAuth({});
    }
    return (
        <div className='container-fluid'>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href={"/"}>
                    LOGIN APP
                </a>
                <div>
                    {authContext.auth.email ?
                        <div>
                          email.gmail.com {' '}
                          <button className={'btn btn-danger btn-sm'} onClick={Logout}>Logout</button>
                        </div>:
                    'you need to login'}
                </div>
            </nav>
        </div>
    );
}

export default Nav;