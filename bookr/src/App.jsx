import { useState, useEffect } from "react";
import "./styles/App.scss";
import SearchBar from "./components/SearchBar";
import Nav from "./components/Nav";
import CardGrid from "./components/CardGrid";
import WelcomeModal from "./components/WelcomeModal";
import { useToken } from "./hooks/useToken";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";

function App() {
  const [q, setQ] = useState("harry+potter");
  const { token, setToken } = useToken("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
  //get the token from the server if it exists
  useEffect(() => {
    onOpen();
    setLoggedIn(false);
    axios
      .get("http://localhost:5000/get-token")
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          setLoggedIn(true);
          setToken(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (e) => {
    let input = e.target.value.trim();
    setQ(input.replace(" ", "+"));
  };

  //set the token from Google
  const handleAuthorizationResponse = (response) => {
    try {
      console.log(response);
      setLoggedIn(true);
      setToken(response.access_token);
      //send token to backend storage
      axios
        .get("http://localhost:5000/set-token", {
          params: {
            token: response.access_token,
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log("logged in? ", loggedIn);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //Pretty sure I don't need this...
  const handleAuthenticationResponse = (response) => {
    console.log(response);
    //decode the returned credential
    // var userObject = jwt_decode(response.credential)
    // //comma instead of plus to display two different data types
    // console.log("UserObject: ", userObject )
    // setUser(userObject)
  };

  const getAccessToken = () => {
    onClose();
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/books",
      callback: handleAuthorizationResponse,
    });
    client.requestAccessToken();
  };

  return (
    <div className="App">
      <WelcomeModal
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
        getAccessToken={getAccessToken}
      />
      <Nav getAccessToken={getAccessToken} />
      <SearchBar
        handleSearchChange={handleSearchChange}
        value={q}
        title={"Find A Book"}
      />
      <CardGrid query={q} />
    </div>
  );
}

export default App;
