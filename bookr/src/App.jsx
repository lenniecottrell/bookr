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
  const [q, setQ] = useState("star+trek");
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalViewed, setModalViewed] = useState(
    window.sessionStorage.getItem("hasSeenModal") || false
  );
  const [sort, setSort] = useState("");
  const { token, setToken } = useToken("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!modalViewed) {
      onOpen();
      window.sessionStorage.setItem("hasSeenModal", true);
    }
  }, []);

  //get the token from the server if it exists
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-token")
      .then((res) => {
        //console.log(res);
        if (res.data.length > 0) {
          setLoggedIn(true);
          setToken(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //set the token from Google
  const handleAuthorizationResponse = (response) => {
    try {
      console.log(response);
      setToken(response.access_token);
      setLoggedIn(true);
      //send token to backend storage
      axios
        .get("http://localhost:5000/set-token", {
          params: {
            token: response.access_token,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
    console.log("logged in? ", loggedIn);
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

  const handleSearchChange = (e) => {
    let input = e.target.value.trim();
    setQ(input.replace(" ", "+"));
  };

  const selectSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="App">
      {!modalViewed && (
        <WelcomeModal
          isOpen={isOpen}
          onClose={onClose}
          getAccessToken={getAccessToken}
        />
      )}
      <Nav
        getAccessToken={getAccessToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        // token={token}
        // setToken={setToken}
        location={"landing"}
      />
      <SearchBar
        handleSearchChange={handleSearchChange}
        value={q}
        selectSort={selectSort}
      />
      <CardGrid query={q} sort={sort} />
    </div>
  );
}

export default App;
