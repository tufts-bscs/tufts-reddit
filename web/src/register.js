import './register.css';
import { Link } from 'react-router-dom';

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
                        <Link to="/login" class="trouble">
                            Back to Login Page
                        </Link>
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