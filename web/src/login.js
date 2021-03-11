import React from 'react';
import { Link } from 'react-router-dom';



function Login() {
    return (
       <div class="flexbox">
           <div class="content">
                <div id="login" class="box show">
                    
                    <div class="field">
                        <div class="sign in"> Bootleg Reddit Sign In</div>
                    </div>

                    <div class="field">
                        <label>Username</label>
                        <input type="text"></input>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <input type="password"></input>
                    </div>

                    <div class="field">
                        <Link to="/register" class="trouble">
                            Trouble signing in?
                        </Link>
                    </div>

                    <div class="field">
                        <button class="btn-sign-in">Sign In</button>
                    </div>
                </div>
           </div>
       </div>
    );
}

export default Login;