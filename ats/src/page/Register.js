import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import {buttons, lang, log_reg} from "../helpers/translate";
import email from '../assets/img/icon/UserIcon.svg'
import userIcon from "../assets/img/icon/user.svg";
import plus from "../assets/img/icon/plus.png";
import {toast} from "react-toastify";
import axios from "axios";
import x from "../assets/img/icon/x.svg";
import InputMask from 'react-input-mask';
import Utils from "../helpers/Utils";
import {useParams} from "react-router";

function Register(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState('')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const params = useParams()
    const handleRegister = useCallback(async () => {
        try {
            if (!form) {
                toast.error('Enter phone and password');
                return;
            }
            let newPhone = form.replaceAll(' ', '').replace('(', '').replace(')', '')
            await axios.post('https://account.ats.am/users/register_user', {
                phone: newPhone,
            });

            navigate(windowWidth > 786?'?phone=' + newPhone+'#registered':'/registered?phone=' + newPhone)
        } catch (e) {

        }
    }, [form,windowWidth])
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const removeHash = () => {
        navigate(location.pathname);
    };
    if (windowWidth > 786) {
        return (

            <div className="big_screen" >
                <div className="login_container"/>
                <div className="login">
                    <div className="login_header">
                        <p>
                            {log_reg.sign[lang[params?.lang || 'en']]}
                        </p>
                        <span onClick={removeHash} style={{cursor:'pointer'}}>
                            <img src={x} alt=''/>

                        </span>
                    </div>
                    <div className="login_block">
                        <div>
                            <div className="login_block_input">
                                <div>
                                    <label>
                                        <img src={email} alt=""/>
                                        <InputMask
                                            mask="374 (99) 999999"
                                            maskChar="_"
                                            placeholder={buttons.email[lang[params?.lang || 'en']]}
                                            onChange={(ev) => setForm(ev.target.value)}
                                            value={form}
                                        >
                                            {(inputProps) => <input {...inputProps} />}
                                        </InputMask>
                                    </label>
                                </div>
                                <div>
                                    <p>{log_reg.desc[lang[params?.lang || 'en'] || 1]}</p>
                                </div>

                            </div>
                            <div>
                                <p className="login_block_text">{log_reg.request[lang[params?.lang || 'en'] || 1]}</p>

                            </div>
                        </div>
                        <div>
                            <div>
                                <button onClick={handleRegister} className="register_btn">
                                    <img src={plus} alt=''/>
                                    {buttons.reg[lang[params?.lang || 'en'] || 1]}
                                </button>
                            </div>
                            <div className="d-flex align-items-center">
                                <Link to="#login" className="simple_btn">
                                    <img src={userIcon} alt="Go to login"/>
                                    <span>{buttons.sign[lang[params?.lang || 'en'] || 1]}</span>
                                </Link>
                                <Link to="#drop">
                                    {buttons.forget[lang[params?.lang || 'en'] || 1]}
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
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
                        {log_reg.sign[lang[params?.lang || 'en']]}
                    </p>

                </div>
                <div className="login_block">
                    <div>
                        <div className="login_block_input">
                            <div>
                                <label>
                                    <img src={email} alt=""/>
                                    <InputMask
                                        mask="374 (99) 999999"
                                        maskChar="_"
                                        placeholder={buttons.email[lang[params?.lang || 'en'] || 1]}
                                        onChange={(ev) => setForm(ev.target.value)}
                                        value={form}
                                    >
                                        {(inputProps) => <input {...inputProps} />}
                                    </InputMask>
                                </label>
                            </div>
                            <div>
                                <button onClick={handleRegister} className="register_btn">
                                    <img src={plus} alt=''/>
                                    {buttons.reg[lang[params?.lang || 'en'] || 1]}
                                </button>
                            </div>

                        </div>
                        <div>
                            <p className="login_block_text">{log_reg.request[lang[params?.lang || 'en'] || 1]}</p>

                        </div>
                    </div>
                    <div>

                        <div className="d-flex align-items-center">
                            <Link to={`/${Utils.lang()}/login`} className="simple_btn">
                                <img src={userIcon} alt="Go to login"/>
                                <span>{buttons.sign[lang[params?.lang || 'en'] || 1]}</span>
                            </Link>
                            <Link to={`/${Utils.lang()}/drop`}>
                                {buttons.forget[lang[params?.lang || 'en'] || 1]}
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        )
    }

}

export default Register;
