import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL } from "../services/Constants/http";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  /*Provjeravamo da li imamo token, ako imamo onda uzimamo taj token i parsiramo ga u objekat, u suprotnom slucaju vrijednost ce biti null*/
  const tokenAuthenticated = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const userAuthenticated = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  const [authTokens, setAuthTokens] = useState(() => tokenAuthenticated);
  const [user, setUser] = useState(() => userAuthenticated);

  //Login function
  const loginUser = async (e) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email: e.email,
        password: e.password,
      });
      console.log("response", response.data);
      if (response.status === 200) {
        /*Ovdje sam dobijeni token postavio u state,
         sto znaci da mozemo pristupiti dobijenim informacijama i provjeriti ako smo prijavljeni da pristupimo protected rutama*/
        setAuthTokens(response.data);

        //U ovom slucaju dobijam informacije korisnika, tako sto mogu da dakodiram taj token i sacuvam ga
        setUser(response.data.token);

        //Ovdje setujem informacije u localStorage, gdje se sacuva svaki put kada se prijavimo
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate("/homepage");
      } else {
        alert("You have to create an account!");
      }
    } catch (err) {
      console.err(err);
    }
  };

  //Logout function
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/LoginForm");
  };

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens,
        user,
        setUser,
        logoutUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
