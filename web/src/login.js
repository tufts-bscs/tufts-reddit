import React from 'react';
import './register.css';



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
                        <a href="#" onClick="Login()" class="trouble">Trouble signing in?</a>
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