import Nav from "./view/Nav";
import Login from "./view/Login";
import Home from "./view/Home";
import {AuthContext, AuthProvider} from "./context/authContext";
import {useContext} from "react";

function App() {
    const authContext = useContext(AuthContext);

  return (
      <div className="App">
          <Nav/>
          {
              authContext.auth.email ? <Home/> : <Login/>
          }
      </div>
  );
}

function AppWithStore(){
    return (
      <AuthProvider>
        <App />
      </AuthProvider>
    );
}

export default AppWithStore;
