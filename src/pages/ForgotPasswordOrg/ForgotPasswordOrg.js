import React from 'react';
import { useState } from "react";
import styles from "../ForgotPasswordCust/ForgotPasswordCust.module.css"
import {apiSendMailOrg}  from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonOrg from '../../components/Button/ButtonOrg';
import BgSnowAnim from '../../components/BgSnowAnim/BgSnowAnim';
import {useNavigate} from 'react-router-dom';

function ForgotPasswordOrg() {
    var navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [code,setCode]=useState(Math.floor(1000 + Math.random() * 9000));
    const [codeEntered,setCodeEntered]=useState("");
    const [isMailSent,setIsMailSent]=useState(false);
    const codecheck = () =>{
      if(code==codeEntered)
      {
        localStorage.clear();
        localStorage.setItem("ChnEmail",email);
        navigate('/ChangePasswordOrg');
      }
      else
      {
        Store.addNotification({...toastNotification,message:"Codes do not match!",type:"danger"})
        console.log('Error');
      }
    }
    const sendemail = async () =>{
        var data={email:email,code:code};
        const res=await apiSendMailOrg(data);
        if(res.status>=200 && res.status<=299){
            Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag});
            setIsMailSent(true);
        }
        else{
          Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag}) 
        }
    }
  return (
    <div>
    <BgSnowAnim/>
      <div className={`${styles.card}`}>
        <h1 className={`${styles.head}`}>Forgot Password</h1>
        <div className={`${styles.content}`}>
          <label>Enter Email : <br /><br /><input type='text' onChange={(event)=>{setEmail(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <ButtonOrg text='Send Mail' func={sendemail} /><br/><br/>
          {(isMailSent)?<div>
          <label>Enter the Code : <br /><br /><input type='password' onChange={(event)=>{setCodeEntered(event.target.value)}} className={`${styles.inputfields}`} /></label><br /><br />
          <ButtonOrg text='Verify Code' func={codecheck} /><br/><br/>
          </div>:<></>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordOrg;