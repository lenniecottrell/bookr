import { useState } from 'react'
import './styles/App.scss'
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import CardGrid from './components/CardGrid';
import { useToken } from './hooks/useToken';
import axios from 'axios';

function App() {
  const [q, setQ] = useState("harry+potter")
  const {token, setToken} = useToken("")
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSearchChange = (e) => {
    let input = e.target.value.trim()
    setQ(input.replace(" ", "+"))
  }

  // const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth'
  // const client_id = '618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com'
  // const redirect_uri = 'http://localhost:3000'
  // const response_type = 'token'
  // const scope = 'https://www.googleapis.com/auth/books'
  
  const handleAuthorizationResponse = (response) => {
    try {
      console.log(response)
      setToken(response.access_token)
      setLoggedIn(true)
      axios.get(
        'http://localhost:5000/set-token', {
          params: {
            token: response.access_token
          }
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  //Pretty sure I don't need this...
  const handleAuthenticationResponse = (response) => {
    console.log(response)
    //decode the returned credential
    // var userObject = jwt_decode(response.credential)
    // //comma instead of plus to display two different data types
    // console.log("UserObject: ", userObject )
    // setUser(userObject)
  }

  const getAccessToken = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: '618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/books',
      callback: handleAuthorizationResponse,
    });
    client.requestAccessToken();
  }

  return (
    <div className="App">
      <Nav getAccessToken={getAccessToken}/>
      <SearchBar handleSearchChange={handleSearchChange} value={q} title={"Find A Book"}/>
      <CardGrid query={q}/>
    </div>
  )
}

export default App
