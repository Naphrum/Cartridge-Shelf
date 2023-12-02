import Login from "./components/LogIn";
import { Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Games from "./components/Games/Games";
import Collection from './components/Collection/Collection'

function App() {

  const { user } = useContext(AppContext);

  return (
    <div>
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Games />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </>
      ) : (
          <Login /> 
      )
    }
    </div>
  );
}

const AppWrapper = () => {
  return(
    <AppProvider>
      <App />
    </AppProvider>
  )
}

export default AppWrapper;
