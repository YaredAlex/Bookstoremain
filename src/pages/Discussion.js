import { getAuth } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import db from '../config';

const Discussion = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [document, setDocument] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getUser = () => {
            getAuth().onAuthStateChanged(user => {
                if (user != null)
                    setCurrentUser(user)
            })
        }
        getUser();
        getData();
        return (() => { getUser(); setDocument([]) })

    }, [])
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
            setDocument(r => [...r, { ...doc.data(), id: doc.id }]);
            //console.log(document)

        });
    }
    const JoinClub = (id) => {
        navigate(`/discussion/chat/${id}`)
    }
    return (
        <div>
            <div className='card-scroll-horizontal'>
                {document && document.map((item, index) => (
                    <div className='book-card-container btn' key={index}
                        onClick={() => JoinClub(item.id)}
                    >
                        <div className='book-card-img-container'>
                            <img src={item.imageUrl} className="book-img" height={"200px"} alt={item.name} />
                        </div>
                        <div>
                            {/* {item.name.length > 15 ? <p>{item.name.substring(0, 15)}...</p> :

                                <p>{item.name.substring(0, 15)}</p>} */}
                            <button className='btn btn-outline-secondary w-100 mt-1'
                            >JOIN</button>
                        </div>
                    </div>
                ))}
            </div>
            {currentUser ? <button className='btn btn-outline-secondary mt-4 ms-4'
            >ADD NEW CLUB</button> :
                <button className='btn btn-outline-secondary mt-4 ms-4'
                    disabled>ADD NEW CLUB</button>}
        </div>
    )
}

export default Discussion;