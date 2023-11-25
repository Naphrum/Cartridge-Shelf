import Login from "./components/LogIn";
import { AppProvider } from "./context/AppContext";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Games from "./components/Games";

function App() {

  const { user } = useContext(AppContext);

  return (
    <div>
      {user ? (
        <>
          <NavBar />
          <Games />
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
