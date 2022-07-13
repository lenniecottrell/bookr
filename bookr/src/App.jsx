import { useState, useEffect } from 'react'
import './styles/App.scss'
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import CardGrid from './components/CardGrid';
import GoogleAuth from './components/GoogleAuth';
import SignOutButton from './components/SignOutButton';
import jwt_decode from 'jwt-decode'


function App() {
  const [q, setQ] = useState("harry+potter")
  //TODO create context for the user state
  const [user, setUser] = useState({})

  const handleChange = (e) => {
    let input = e.target.value.trim()
    setQ(input.replace(" ", "+"))
  }

  const handleCallbackResponse = (response) => {
    //decode the returned credential
    var userObject = jwt_decode(response.credential)
    //comma instead of plus to display two different data types
    console.log("UserObject: ", userObject )
    setUser(userObject)
  }

  useEffect(()=> {
    //global google
    google.accounts.id.initialize({
      client_id: '618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.querySelector('.signIn'),
      {theme: 'outline', size: 'large'}
    )
  }, [])

  return (
    <div className="App">
      <Nav />
      { !user ? <GoogleAuth /> : <SignOutButton setUser={setUser}/>}
      <SearchBar handleChange={handleChange} value={q} title={"Find A Book"}/>
      <CardGrid query={q}/>
    </div>
  )
}

export default App
