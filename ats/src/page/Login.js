import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {buttons, input, lang, log_reg} from "../helpers/translate";
import email from '../assets/img/icon/UserIcon.svg'
import pass from '../assets/img/icon/pass.svg'
import userIcon from "../assets/img/icon/user.svg";
import plus from "../assets/img/icon/plus.png";
import axios from "axios";
import {toast} from "react-toastify";
import Cookies from 'js-cookie'
import x from '../assets/img/icon/x.svg'
import InputMask from 'react-input-mask';
import Utils from "../helpers/Utils";
import {useParams} from "react-router";

function Login(props) {
    const [phone, setUserName] = useState('')
    const params = useParams()
    const [password, setPassword] = useState('')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleLogin = useCallback(async (ev) => {
        try {
            ev.preventDefault()
            if (!phone || !password.trim()) {
                toast.error('Enter phone and password');
                return;
            }

            let newPhone = phone.replaceAll(' ', '').replace('(', '').replace(')', '')
            if(newPhone === '37455555555'){
                window.location.href = `https://account.ats.am/login?phone=37455555555`
            }
            await axios.post('https://account.ats.am/users/login', {
                phone: newPhone,
                password
            });
            Cookies.set('login', 'true')

            window.location.href = `https://account.ats.am/confirm/user/${newPhone}`
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }, [phone, password])
    const navigate = useNavigate()
    const location = useLocation()
    const removeHash = () => {
        navigate(location.pathname);
    };

    if (windowWidth > 786) {
        return (

            <div className="big_screen" >
                <div className="login_container"/>
                <form onSubmit={handleLogin} className="login">
                    <div className="login_header">
                        <p>
                            {log_reg.login[lang[params?.lang || 'en']]}
                        </p>
                        <span onClick={removeHash} style={{cursor:'pointer'}}>
                            <img src={x} alt=''/>

                        </span>
                    </div>
                    <div className="login_block m-0">
                        <div>
                            <div className="login_block_input">
                                <div>
                                    <label>
                                        <img src={email} alt=""/>
                                        <InputMask
                                            mask="374 (99) 999999"
                                            maskChar="_"
                                            placeholder={buttons.email[lang[params?.lang || 'en'] || 1]}
                                            onChange={(ev) => setUserName(ev.target.value)}
                                            value={phone}
                                        >
                                            {(inputProps) => <input {...inputProps} />}
                                        </InputMask>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <img src={pass} alt=""/>

                                        <input
                                            value={password}
                                            onChange={(ev) => setPassword(ev.target.value)}
                                            placeholder={buttons.pass[lang[params?.lang || 'en'] || 1]}
                                            type="password"/>
                                    </label>
                                </div>
                                <p>{input.telegram[lang[params?.lang || 'en'] || 1]}</p>

                            </div>
                            <div>
                                <p className="login_block_text">{buttons.desc[lang[params?.lang || 'en'] || 1]}</p>

                            </div>
                        </div>
                        <div>
                            <div>
                                <button onClick={handleLogin} className="simple_btn">
                                    <img src={userIcon} alt=""/>
                                    <span>{buttons.sign[lang[params?.lang || 'en'] || 1]}</span>
                                </button>
                                <Link to={windowWidth > 786 ? "#drop":`/${Utils.lang()}/drop`}>
                                    {buttons.forget[lang[params?.lang || 'en'] || 1]}
                                </Link>
                            </div>
                            <div>
                                <Link to={windowWidth > 786 ? '#register' : `/${Utils.lang()}/register`} className="register_btn">
                                    <img src={plus} alt='Go to register'/>
                                    {buttons.reg[lang[params?.lang || 'en'] || 1]}
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div className="login">
                <div className="login_header justify-content-end">

                    <Link to={localStorage.getItem('ats_link') || '/'}>
                        <img src={x} alt='Go back'/>
                    </Link>
                </div>
                <div className="login_header">
                    <p>
                        {log_reg.login[lang[params?.lang || 'en']]}
                    </p>

                </div>
                <form onSubmit={handleLogin} className="login_block">
                    <div>
                        <div className="login_block_input">
                            <div>
                                <label>
                                    <img src={email} alt=""/>
                                    <InputMask
                                        mask="374 (99) 999999"
                                        maskChar="_"
                                        placeholder={buttons.email[lang[params?.lang || 'en'] || 1]}
                                        onChange={(ev) => setUserName(ev.target.value)}
                                        value={phone}
                                    >
                                        {(inputProps) => <input {...inputProps} />}
                                    </InputMask>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <img src={pass} alt=""/>

                                    <input
                                        value={password}
                                        onChange={(ev) => setPassword(ev.target.value)}
                                        placeholder={buttons.pass[lang[params?.lang || 'en'] || 1]}
                                        type="password"/>
                                </label>
                                <p>{input.telegram[lang[params?.lang || 'en'] || 1]}</p>

                            </div>

                        </div>
                        <div>
                            <button onClick={handleLogin} className="simple_btn">
                                <img src={userIcon} alt=""/>
                                <span>{buttons.sign[lang[params?.lang || 'en'] || 1]}</span>
                            </button>
                            <Link to={`/${Utils.lang()}/drop`}>
                                {buttons.forget[lang[params?.lang || 'en'] || 1]}
                            </Link>
                        </div>
                        <div>
                            <p className="login_block_text">{buttons.desc[lang[params?.lang || 'en'] || 1]}</p>

                        </div>
                        <div>
                            <Link to={`/${Utils.lang()}/register`} className="register_btn">
                                <img src={plus} alt='Go to register'/>
                                {buttons.reg[lang[params?.lang || 'en'] || 1]}
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
    // }

}

export default Login;
