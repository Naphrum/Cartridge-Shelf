import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
  }, []);

  useEffect(() => {
    const getCollection = async () => {
      if (user?.id) {
        const response = await axios.get(
          `http://localhost:4001/v1/users/${user.id}/collection`
        );
        console.log(response.data);
        setCollection(response.data);
      }
    };
    getCollection();
  }, [user]);

  const addGameToCollection = async (user_id, game_id) => {
    const response = await axios.post(`/v1/collection`, {
      user_id,
      game_id,
    });
    console.log(response.data)
    setCollection((previousCollection) => [...previousCollection, response.data]);
  };

  const updateStarRating = async (id, user_star_rating) => {
    const response = await axios.put(`/v1/collection`, {
      id,
      user_star_rating,
    });
    setCollection(response.data);
  };

  const deleteGameFromCollection = async (user_id, game_id) => {
    const response = await axios.delete(`/v1/collection`, {
      user_id,
      game_id,
    });
    setCollection(response.data);
  };

  const login = async (email, username, password) => {
    const response = await axios.post("/v1/login", {
      email,
      username,
      password,
    });
    console.log(response);
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

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        collection,
        addGameToCollection,
        deleteGameFromCollection,
        updateStarRating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
