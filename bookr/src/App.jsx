import { useState, useEffect } from 'react'
import './styles/App.scss'
import axios from 'axios'
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import CardGrid from './components/CardGrid';


function App() {
  const [allBookData, setAllBookData] = useState({title: "hungry caterpillar", author: "richard scary?"})
  const [allBookTitles, setAllBookTitles] = useState([])
  const [allBookAuthors, setAllBookAuthors] = useState([])

  const [q, setQ] = useState("harry+potter")


  const handleChange = (e) => {
    let input = e.target.value.trim()
    setQ(input.replace(" ", "+"))
  }

  const getBooks = () => {
    axios({
      url: 'https://www.googleapis.com/books/v1/volumes',
      params: {q}
    })
    .then((response) => {
      const allBooks = response.data.items
      const titles = []
      const authors = []
      for (let i = 0; i < allBooks.length; i++) {
        titles.push(allBooks[i].volumeInfo.title)
      }
      for (let i = 0; i < allBooks.length; i++) {
        authors.push(allBooks[i].volumeInfo.authors)
      }
      console.log(titles)
      setAllBookTitles(titles)
      console.log(authors)
      setAllBookAuthors(authors)
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    //do nothing if the search box is empty
    if (q==="") {
      return
    }
    getBooks()
  }, [q])

  return (
    <div className="App">
      <Nav />
      <SearchBar handleChange={handleChange} value={q}/>
      <CardGrid  allBookData={allBookData} allBookTitles={allBookTitles} allBookAuthors={allBookAuthors}/>
    </div>
  )
}

export default App
