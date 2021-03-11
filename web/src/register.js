import React from 'react';
import './register.css';

function Register() {
    return (
       <div class="flexbox">
           <div class="content">
               <div id="register" class="box show">

                   <div class="field">
                       <div class="sign-in">Register</div>
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
                       <label>Confirm Your Password</label>
                       <input type="password"></input>
                   </div>

                   <div class="field">
                       <a href="#" id="back" class="trouble">Back to Login Page</a>
                   </div>

                   <div class="field">
                       <button class="btn-sign-in">Register For Reddit</button>
                   </div>
               </div>
           </div>
       </div>
    );
}

export default Register;