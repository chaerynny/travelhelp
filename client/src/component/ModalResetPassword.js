import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import "../scss/Modal.scss";
import axios from 'axios';

function ResestPassword(props) {

  // get from each menu
  const { isOpen, setModal, history } = props;

  // input state of user information for signin
  const [email, inputEmail] = useState('');

  // failure of signin
  const [failAlertSignUp, setFailAlertSignUp] = useState(false);
  const [failAlertVerification, setFailAlertVerification] = useState(false);

  // change language handler
  const { t } = useTranslation();

  // reset password handler
  const handleResetPasswordBtn = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3355/users/reset_password", {
      email: email
    },{
      withCredentials: true,
    }, {
      headers: { 
        "Access-Control-Allow-Origin": "http://localhost:3355",
       }
    })
    .then(res => {
      console.log("res:", res);
      if(res.data.status === 404) {
        inputEmail("");
        setFailAlertSignUp(true)
      } else if(res.data.status === 401) {
        inputEmail("");
        setFailAlertVerification(true)
      } else {
        inputEmail("");
        window.location = "/user/emailVerified";
      }
    })
  }

  return(
    <div className={isOpen ? "openModal" : "none"}>
      <div className="modalContentPassword">

        {/* close modal */}
        <button className="modalCloseBtn" onClick={e => {
          e.preventDefault();
          setModal(!isOpen);
        }}><CloseIcon /></button>

        <div className="modalTitle">{t('signin.forgotPassword')}</div>
        <div className="emailInputBox">
          <div className="step1">{t('resetPassword.step1')}</div>
          <div className="emailAddress">{t('resetPassword.email')}</div>
          <form>
            <input className="emailInput" type="text" name="email" onChange={(e) => inputEmail(e.target.value)} placeholder={t("signin.email")} label="Email Address" />
          </form>
          <button className="resetPasswordBtn" onClick={handleResetPasswordBtn}>{t('resetPassword.btn')}</button>
          <div className={failAlertSignUp ? "alert" : "none"}>You need to sign up first.</div>
          <div className={failAlertVerification ? "alert" : "none"}>You need to verify your email address first.<br />Please check your email or resend it from this link.</div>
        </div>
      </div>
    </div>
  )
}

export default ResestPassword; 