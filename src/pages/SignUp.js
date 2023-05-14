import { useState } from 'react'
import swal from 'sweetalert';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import ReactLoading from 'react-loading'
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import db from '../config';
const SignUp = () => {
    const [credential, setCrendential] = useState({
        email: "",
        password: "",
        confirm: ""
    });
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false)

    const signUpUser = async (e) => {
        e.preventDefault();
        if (credential.password !== credential.confirm) {
            console.log("please");
            swal("Oooh", "passwordDon't match", "warning");
            return;
        }
        setLoading(true)
        createUserWithEmailAndPassword(getAuth(), credential.email, credential.password)
            .then(res => {
                registerUser(res);
            }).catch(e => {
                setLoading(false)
                setCrendential({ ...credential, password: "", confirm: "" })
                if (e.code === "auth/email-already-in-use")
                    swal("Error", "Email already in use", "error")

            })

    }
    const registerUser = async (user) => {
        console.log(user.user.uid)
        const ref = doc(db, "users", user.user.uid);
        await setDoc(ref, {
            email: user.user.email
        }).then(res => {
            console.log(res)
            setLoading(false)
            navigation("/");
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }
    const showPassword = (e, id) => {
        const pass = document.getElementById(id);
        if (pass.type === "password") {
            pass.type = "text";
            e.target.innerHTML = "H"
        }
        else {
            pass.type = "password"
            e.target.innerHTML = "S"
        }
    }
    return (
        <>
            {loading && <div style={{
                position: "fixed", top: "0px", left: "0px", height: "100vh", zIndex: "100", width: "100vw"
                , display: "flex", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center"
            }}>
                <ReactLoading type='balls' color='#ccc' width="10%" height="30%" />
            </div>}

            <div style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#eee",
                height: "100vh"
            }}>
                <div
                    style={{
                        marginTop: "50px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        padding: "20px 30px",
                        height: "300px",
                        minWidth: "300px"
                    }}>
                    <form
                        style={{
                            marginTop: "5px"

                        }}
                        onSubmit={(e) => signUpUser(e)}>

                        <h4 className='text-primary'>SignUp</h4>
                        <input type={"email"} placeholder="Your Email" required className='form-control mt-2 w-100 d-block border border-primary'
                            onChange={(e) => setCrendential({ ...credential, email: e.target.value })} value={credential.email} />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type={"password"} placeholder="Password" required className='form-control mt-1 w-90 border border-primary'
                                minLength="8" onChange={(e) => setCrendential({ ...credential, password: e.target.value })} id="password" value={credential.password} />
                            <span
                                style={{ padding: "5px" }}
                                onClick={(e) => showPassword(e, "password")} className="btn">S</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <input type={"password"} placeholder="Confirm Password" required className='form-control mt-1 w-100 d-block border border-primary'
                                onChange={(e) => setCrendential({ ...credential, confirm: e.target.value })} id="confirm" value={credential.confirm} />
                            <span
                                style={{ padding: "5px" }}
                                onClick={(e) => showPassword(e, "confirm")} className="btn">S</span>
                        </div>
                        <button className='btn btn-outline-primary mt-3'
                        >SignUp</button>
                    </form>
                    <p>already have account <Link to={"/login"}>Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignUp