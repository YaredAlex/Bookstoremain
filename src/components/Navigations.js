import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const Navigation = () => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribe = () => {
            getAuth().onAuthStateChanged(user => {
                if (user !== null) {
                    setCurrentUser(user)
                }
            })
        }
        unsubscribe();
        return () => {
            unsubscribe();
        }
    }, [])

    const userSignout = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to Logout?",
            icon: "warning",
            dangerMode: true,
        })
            .then(logout => {
                if (logout) {
                    signOut(getAuth())
                        .then(() => {
                            swal("Logedout", "You have successfuly loged out", "success")
                            setCurrentUser(null)
                        })
                        .catch(() => {
                            swal("Error", "error occured while signout", "danger")
                        })

                }
            });


    }
    return (
        <div style={{
            display: "flex"
        }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light"
                style={{
                    flex: "9"
                }}
            >
                <a className="navbar-brand" href="#"
                    style={{ marginLeft: "20px" }}>BOOK</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ml-2">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/discussion"}>Book Club<span className="sr-only">(current)</span></Link>
                        </li>

                        {/* <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li> */}
                        {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}                    {currentUser ? <div className="nav-item dropdown ml-2">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {currentUser.email}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <span className="dropdown-item" >User</span>
                                <div className="dropdown-divider"></div>
                                <span className="dropdown-item" onClick={() => userSignout()}>SignOut</span>
                            </div>
                        </div>
                            : <></>}

                    </ul>

                </div>
            </nav>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 10px", columnGap: "5px" }}>
                {currentUser ? <></>
                    : <><Link className="btn btn-outline-primary"
                        style={{
                            display: "block",

                        }} to="/login">Login/SignUp</Link>
                    </>}
            </div>
        </div>
    )
}

export default Navigation;