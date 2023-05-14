import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react'
import ReactLoading from 'react-loading'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const LogIn = () => {
    const [credential, setCrendential] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault();

        setLoading(true)
        signInWithEmailAndPassword(getAuth(), credential.email, credential.password)
            .then(() => {
                setLoading(false)
                //console.log(res)
                navigate("/");
            }).catch(e => {
                console.log(e.code)
                setLoading(false)
                setCrendential({ ...credential, password: "", confirm: "" })
                if (e.code === "auth/invalid-email" || e.code === "auth/user-not-found")
                    swal("Error", "Invaild email address", "error")
                if (e.code === "auth/wrong-password")
                    swal("Error", "Wrong Password", "error")
                //auth/wrong-password
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
                height: "95vh"
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
                            marginTop: "30px"

                        }}
                        onSubmit={(e) => loginUser(e)}>
                        <h4>LogIn</h4>
                        <input type={"email"} placeholder="Your Email" required className='form-control mt-2 w-100 d-block border border-primary'
                            onChange={(e) => setCrendential({ ...credential, email: e.target.value })} value={credential.email} />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type={"password"} placeholder="Password" required className='form-control mt-1 w-90 border border-primary'
                                minLength="8" onChange={(e) => setCrendential({ ...credential, password: e.target.value })} id="password" value={credential.password} />
                            <span
                                style={{ padding: "5px" }}
                                onClick={(e) => showPassword(e, "password")} className="btn">S</span>
                        </div>
                        <button className='btn btn-outline-primary mt-3'>Login</button>
                    </form>

                    <p>don&apost have account <Link to={"/signup"}>create one?</Link></p>
                </div>
            </div>
        </>
    )
}

export default LogIn