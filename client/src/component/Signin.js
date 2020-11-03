import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../scss/Form.scss';

function Signin(props) {

  // login state props
  const { setIsLogin, setEmail, setName, setUserId } = props;

  // change language handler
  const { t } = useTranslation();

  // input state of user information for signin
  const [email, inputEmail] = useState('');
  const [password, inputPassword] = useState('');

  // failure of signin
  const [failAlert, setFailAlert] = useState(false);

  // signin handler
  const handleLoginBtn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3355/users/signin', {
      email: email,
      password: password
<<<<<<< HEAD
    },{
      withCredentials: true
    },
    {
      headers: { "Access-Control-Allow-Origin": "http://localhost:3355" }
=======
    }, {
      withCredentials: true,
    }, {
      headers: { 
        "Access-Control-Allow-Origin": "http://localhost:3355",
       }
>>>>>>> dc2ee0e330debb3f7e14ff7a4acc25cd99271ef8
    })
    .then(res => {
      console.log(res.data.id, res.data.email, res.data.name)
      window.sessionStorage.setItem('id', res.data.id);
      window.sessionStorage.setItem('email', res.data.email);
      window.sessionStorage.setItem('name', res.data.name);
      setIsLogin(true);
      setUserId(res.data.id);
      setEmail(res.data.email);
      setName(res.data.name);
      inputEmail("");
      inputPassword("");
    })
    .catch((err) => setFailAlert(true));
  }

  return(
    <div className="background">

      <h1 className="h1">{t('signin.signin')}</h1>

      <div className="content">
        {/* social signin */}
        <div className="signupBtn">
          <a href="/user/signupwithemail" className="btn googleBtn">{t('signin.google')}</a>
        </div>
        <div className="signupBtn">
          <a href="/user/signupwithemail" className="btn wechatBtn">{t('signin.wechat')}</a>
        </div>
        <div className="signupBtn">
          <a href="/user/signupwithemail" className="btn lineBtn">{t('signin.line')}</a>
        </div>

        {/* or */}
        <div className="signupOR">
          <span>{t('signin.or')}</span>
        </div>

        {/* email signin */}
        <form className="signupForm">
          <input className="signupInput" type="text" name="email" onChange={(e) => inputEmail(e.target.value)} placeholder={t("signin.email")} label="Email Address" />
          <input className="signupInput" type="password" name="password" onChange={(e) => inputPassword(e.target.value)} placeholder={t("signin.password")} label="Password" />
          <div className={failAlert ? "alert" : "none"}>{t('signin.wrongInfo')}</div>
        </form>

        {/* signin btn */}
        <button className="signupSubmitBtn" onClick={handleLoginBtn}>{t('signin.signin')}</button>
        
        {/* find password */}
        <div className="gotoSignIn forgotPassword">
          <a href="/user/signup">{t('signin.forgotPassword')}</a>
        </div>

        {/* go to signup */}
        <div className="gotoSignIn">
          <a href="/user/signup">{t('signin.gotoSignUp')}</a>
        </div>

      </div>
    </div>
  )
}

export default withRouter(Signin);