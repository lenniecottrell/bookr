import { useState } from 'react'
import './styles/App.scss'
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import CardGrid from './components/CardGrid';


function App() {
  const [q, setQ] = useState("harry+potter")

  const handleChange = (e) => {
    let input = e.target.value.trim()
    setQ(input.replace(" ", "+"))
  }

  return (
    <div className="App">
      <Nav />
      <SearchBar handleChange={handleChange} value={q} title={"Find A Book"}/>
      <CardGrid query={q}/>
    </div>
  )
}

export default App
