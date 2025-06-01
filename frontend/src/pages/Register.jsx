import React from "react";

const Register =() =>{
    return(
        <div>
            <div>
                <form>
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input type='text' placeholder="Enter Username"></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type='email' placeholder="Enter Email"></input>
                    </div>
                    <div>
                        <label htmlFor="password">UserName</label>
                        <input type="password" placeholder="Enter Password"></input>
                    </div>

                    <button type="submit"> Submit</button>
                </form>
                <div>
                    <p>Already have account?</p>
                    <a href="Register">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Register