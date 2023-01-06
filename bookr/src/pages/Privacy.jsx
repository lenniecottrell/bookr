import React, { useState } from "react";
import { useToken } from "../hooks/useToken";
import Nav from "../components/Nav";
import { Heading, Text, Container, Link } from "@chakra-ui/react";

const Privacy = () => {
  const [loggedIn, setLoggedIn] = useState(
    window.sessionStorage.getItem("token")
  );
  const { token, setToken } = useToken("");

  const getAccessToken = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "524662715635-n46j1g1tsqa54mfmb7pnh9nipvri3ajr.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/books",
      callback: handleAuthorizationResponse,
    });
    client.requestAccessToken();
  };

  //set the token from Google
  const handleAuthorizationResponse = (response) => {
    try {
      setToken(response.access_token);
      setLoggedIn(true);
      sessionStorage.setItem("token", response.access_token);
      console.log("got the token");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav
        getAccessToken={getAccessToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        w="100%"
      >
        <Heading size={{ base: "lg", md: "xl" }} mb={4}>
          Privacy Policy
        </Heading>
        <Text fontSize="xl" m={2}>
          Shelf does not collect or store your data. Shelf leverages the{" "}
          <Link
            href="https://developers.google.com/books"
            color="blue.500"
            textDecoration="underline"
          >
            Google Books API
          </Link>{" "}
          to access data in your Google account, all of which is stored on
          Google's servers. The email address you use to log in is only used to
          communicate with Google Account Services, it is not stored by this web
          application. If you choose to create a new account when logging in to
          Shelf, that process is handled by Google.
        </Text>
        <Text fontSize="xl" m={2}>
          Shelf's use of information received from Google APIs will adhere to
          the{" "}
          <Link
            href="https://developers.google.com/terms/api-services-user-data-policy"
            color="blue.500"
            textDecoration="underline"
          >
            Google API Services User Data Policy
          </Link>
          , including the Limited Use requirements.
        </Text>
        <Text fontSize="xl" m={2}>
          The Google Books privacy policy can be viewed{" "}
          <Link
            href="https://www.google.com/googlebooks/privacy-2010dec6.html"
            color="blue.500"
            textDecoration="underline"
          >
            here{" "}
          </Link>
          and Google's general privacy policy can be viewed{" "}
          <Link
            href="https://policies.google.com/privacy"
            color="blue.500"
            textDecoration="underline"
          >
            here
          </Link>
          .
        </Text>
        <Text fontSize="xl" m={2}>
          I am not responsibile for the content of Google's privacy policy or
          privacy practices.
        </Text>
      </Container>
    </>
  );
};

export default Privacy;
