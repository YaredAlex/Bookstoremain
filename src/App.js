import './App.css';
import search from "./search.png"
import './config.js'
import db from './config.js';
import { doc, getDocs, collection, getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
function App() {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      setDocument(r => [...r, doc.data()]);
      console.log(document)

    });
  }

  return (
    <div className="App">
      <div className='background'>
        <div className='background-cover'>
          <h2>BIBLIOPHILE:ONE STOP SOLUTION FOR ALL YOUR BOOKISH NEEDS</h2>
          <div className='search-wrapper'>
            <div className='search-container'>
              <input type="search" placeholder='Search your favorite book' className='search-bar' />
              <img src={search} width="20px" height={"20px"}
                style={{ marginRight: "20px" }} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Here are your books</h3>
        <div className='card-scroll-horizontal'>
          {document && document.map((item, index) => (
            <div className='book-card-container' key={index}>
              <div className='book-card-img-container'>
                <img src={item.imageUrl} className="book-img" alt={doc.name} />
              </div>
              <div>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}

export default App;
