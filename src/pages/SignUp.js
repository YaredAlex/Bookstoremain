import React from 'react'

const SignUp = () => {
    return (
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

                    }}>

                    <h4 className='text-primary'>SignUp</h4>
                    <input type={"text"} placeholder="Your Email" required className='form-control mt-2 w-100 d-block border border-primary' />
                    <input type={"password"} placeholder="Password" required className='form-control mt-1 w-100 d-block border border-primary' />
                    <input type={"password"} placeholder="Confirm Password" required className='form-control mt-1 w-100 d-block border border-primary' />
                    <button className='btn btn-outline-primary mt-3'>SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp