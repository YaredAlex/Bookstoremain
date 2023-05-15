import { getAuth } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../config';

const BookChat = () => {
    const { id } = useParams()
    const [chats, setChats] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [book, setBook] = useState("")
    const getBook = async () => {
        const docRef = doc(db, "books", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            setBook(snap.data())

        }
    }
    const getUser = getAuth().onAuthStateChanged(user => {
        if (user != null) {
            setCurrentUser(user)
        }
    })
    useEffect(() => {
        getBook();
        getUser();
        const docRef = doc(db, "book-discussion", id);
        const getChats = () => {
            getDoc(docRef)
                .then(res => {
                    const tmp = []
                    for (var i in res.data()) {
                        tmp.push(res.data()[i])

                    }
                    for (let i = 0; i < tmp.length; i++) {
                        let key = i;
                        for (let j = i + 1; j < tmp.length; j++) {
                            if (tmp[key].timeStamp > tmp[j].timeStamp) {
                                key = j;
                            }
                        }
                        if (i != key) {
                            const x = tmp[i];
                            tmp[i] = tmp[key]
                            tmp[key] = x
                        }
                    }
                    setChats([...tmp])
                    setTimeout(() => {
                        document.getElementById("chats").scrollTop = document.getElementById('chats').scrollHeight;

                    }, 100)


                })
                .catch(e => {
                    console.log(e);
                })
        }
        getChats();
        return () => {
            setChats([]);
            getChats();
        }
    }, [])
    const sendChat = (e) => {
        e.preventDefault();
        const m = document.getElementById("msg").value
        const docRef = doc(db, "book-discussion", id);
        let timestamp = Date.now()
        setDoc(docRef,

            {
                [timestamp]: {
                    msg: m,
                    timeStamp: timestamp,
                    email: currentUser.email
                }
            }
            , { merge: true })
            .then(() => {
                getChanges();
                document.getElementById("msg").value = ""
            })
            .catch(e => {
                console.log(e);
            })
    }
    const getChanges = async () => {
        onSnapshot(doc(db, "book-discussion", id), (doc) => {
            const tmp = []
            for (var i in doc.data()) {
                tmp.push(doc.data()[i])
            }
            for (let i = 0; i < tmp.length; i++) {
                let key = i;
                for (let j = i + 1; j < tmp.length; j++) {
                    if (tmp[key].timeStamp > tmp[j].timeStamp) {
                        key = j;
                    }
                }
                if (i != key) {
                    const x = tmp[i];
                    tmp[i] = tmp[key];
                    tmp[key] = x
                }
            }
            setChats([...tmp])
            setTimeout(() => {
                document.getElementById("chats").scrollTop = document.getElementById('chats').scrollHeight;

            }, 100)
        });
    }
    const Messages = (chat, index) => {
        return (
            <div key={index} >
                {chat.chat ? <>
                    {chat.chat.email === currentUser.email ?
                        <div className='border border-secondary rounded-pill p-1 ps-2 pe-2 mb-1 d-inline-block'
                            style={{ background: "linear-gradient(90deg, rgba(255,214,143,1) 0%, rgba(255,177,254,1) 55%, rgba(218,142,255,1) 100%)", color: "black" }}>
                            <p className='mb-0'>{chat.chat.msg}</p>
                            <span className='rounded-circle bg-primary text-white pe-1 ps-1'>{chat.chat.email.substring(0, 1).toUpperCase()}</span>
                        </div> :
                        <div className='border border-secondary rounded-pill p-1 ps-2 pe-2 mb-1 d-inline-block'
                            style={{ background: "linear-gradient(90deg, rgba(246,79,252,1) 0%, rgba(177,177,255,1) 55%, rgba(142,236,255,1) 100%)" }}>
                            <p className='mb-0'>{chat.chat.msg}</p>
                            <span className='rounded-circle bg-primary text-white pe-1 ps-1'>{chat.chat.email.substring(0, 1).toUpperCase()}</span>
                        </div>}

                </> : <></>}
            </div>
        )

    }
    return (
        <div className='chat-container'>
            {book &&
                <div className='mt-2'>
                    <h5 className='text-center'>CLUB</h5>
                    <p className='p-2 mb-0'>{book.name}</p>
                </div>}
            <div className='chat-window p-2' >
                <div className='chats' id='chats'>
                    {chats ? chats.map((chat, index) => (
                        <Messages chat={chat} index={index} key={index} />
                    )) : <></>}
                </div>
                <form onSubmit={(e) => sendChat(e)}>
                    <div>
                        <input type="" placeholder="Msg" id="msg" required className='mt-2 w-100 d-block border border-primary form-control'
                        />
                    </div>
                    {currentUser ? <button className='btn btn-outline-secondary mt-2'>Send</button> :
                        <button className='btn btn-outline-secondary mt-2' disabled >Login</button>}
                </form>
            </div>
        </div>
    )
}

export default BookChat