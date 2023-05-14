import './App.css';
import searchpng from "./search.png"
import './config.js'
import db from './config.js';
import { getDocs, collection, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Books from './components/Books';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const [document, setDocument] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getData();
    return (() => setDocument([]));
  }, [])
  const [searched, setSearched] = useState([])
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      setDocument(r => [...r, { ...doc.data(), id: doc.id }]);
      //console.log(document)

    });
  }
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 2) {
      const result = document.filter(book => book.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setSearched(result)
    }
    else
      setSearched([])
  }
  return (
    <div className="App">
      <div className='background'>
        <div className='background-cover'>
          <h2>BIBLIOPHILE:ONE STOP SOLUTION FOR ALL YOUR BOOKISH NEEDS</h2>
          <div className='search-wrapper'>
            <div className='search-container'>
              <input type="text" placeholder='Search your favorite book' className='search-bar' onChange={(e) => handleSearch(e)} value={search} />
              <img src={searchpng} width="20px" height={"20px"}
                style={{ marginRight: "20px", minWidth: "20px" }} />
            </div>
            {searched.length >= 1 && searched.map((book, index) =>
              <div key={index}
                style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "300px", cursor: "pointer", zIndex: "100" }}
                onClick={() => navigate(`detail/${book.id}`)}>
                <p>{book.name}</p>
                <hr />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className='mt-3 ms-2'>Here are your books</h3>
        <Books document={document} />
      </div>
    </div>
  );
}

export default App;
