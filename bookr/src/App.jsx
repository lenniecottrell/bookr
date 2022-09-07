import { useState, useEffect } from "react";
import { useToken } from "./hooks/useToken";
import { useDisclosure } from "@chakra-ui/react";
import "./styles/App.scss";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Nav from "./components/Nav";
import CardGrid from "./components/CardGrid";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [q, setQ] = useState("star+trek");
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") !== null
  );
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

  //set the token from Google
  const handleAuthorizationResponse = (response) => {
    try {
      //console.log(response);
      setToken(response.access_token);
      setLoggedIn(true);
      localStorage.setItem("token", response.access_token);
      console.log("got the token");
    } catch (error) {
      console.error(error);
    }
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
