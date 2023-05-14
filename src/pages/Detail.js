import { async } from '@firebase/util';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../config';

function Detail() {
    const { id } = useParams();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const unsubscribe = async () => {
        const docRef = doc(db, "books", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            setData(snap.data())
            setLoading(false);
        }
    }
    useEffect(() => {
        const getUser = async () => {
            getAuth().onAuthStateChanged(user => {
                if (user != null) {
                    console.log(user)
                    setCurrentUser(u => user);
                }
            })
        }
        getUser();
        unsubscribe();
        return (() => getUser())
    }, []);
    const submitComment = async () => {
        if (name === "") {
            alert("name is required")
            return;
        }
        const docRef = doc(db, "books", id);
        if (data.comment)
            await setDoc(docRef, {
                comment: [...data.comment, { text: text, name: name }]
            }, { merge: true });
        else
            await setDoc(docRef, {
                comment: [{ text: text, name: name }]
            }, { merge: true });
        setText("")
        setName("")
        data.comment = [...data.comment, { text: text, name: name }];
    }
    return (
        <>
            {loading ? <p>Page is loading</p> :
                <div
                    style={{
                        backgroundColor: "#edebeb",

                    }}>

                    <div className='detail_container'>
                        <div
                            className='h1 mt-2 mb-2'>BIBLIOPHILE:BOOKS</div>
                        <div className='img_detail'>
                            <img src={data.imageUrl} className="" alt={data.name} />
                        </div>
                        <p
                            className='w-50 text-center fw-bold'>{data.name}</p>
                        <div className='w-400 w-50 mt-md-2'>
                            <p>{data.description}</p>
                        </div>
                        <p className='m-0'>Rating</p>
                        <div className='mb-3'>
                            <span className='fa fa-star checked'></span>
                            <span className='fa fa-star checked'></span>
                            <span className='fa fa-star checked'></span>
                            <span className='fa fa-star checked'></span>
                            <span className='fa fa-star checked'></span>
                        </div>
                        <a
                            className='btn btn-primary d-block'
                            href={data.fileUrl} download="DownloadPDF" target="_blank">GET PDF</a>
                        <div className='suggestion-container'>
                            {data.comment && <> <p className='h6 mt-3 ms-2'>Other's suggestions</p><hr /></>}
                            <div className='p-2'>
                                {
                                    data.comment && data.comment.map((com, index) => (
                                        <div className='divide form-control mb-2' key={index}>
                                            <p className='h6'>{com.name}</p>
                                            <p>{com.text}</p>

                                        </div>
                                    ))
                                }

                                <p className='h5'>Put your suggestions</p>
                                <input placeholder='Your Name' className='form-control d-block mb-2'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name} />
                                <textarea cols='30' rows='2'
                                    placeholder='Your comment'
                                    className='form-control'
                                    id="comment"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                {currentUser ? <button className='btn btn-success d-block mt-2'
                                    style={{
                                        width: "200px",
                                        marginBottom: "10px"
                                    }}

                                    onClick={() => submitComment()}>Submit</button> :

                                    <button className='btn btn-success d-block mt-2'
                                        style={{
                                            width: "200px",
                                            marginBottom: "10px"
                                        }} disabled
                                    >Login to Submit</button>}

                            </div>
                        </div>
                    </div>

                </div>
            }
        </>



    )
}

export default Detail