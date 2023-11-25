import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        const cachedUser = localStorage.getItem('user');
        if(cachedUser){
            setUser(JSON.parse(cachedUser))
        }
    },[])

    const login = async (email, username, password) => {
        const response = await axios.post("/v1/login", {
          email,
          username,
          password,
        });
        console.log(response)
        if (response.data) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.error("Login failed.");
        }
      };
    
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
      };

    return(
        <AppContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AppContext.Provider>
    )

}

export default AppContext