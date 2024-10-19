import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {buttons, lang,input, log_reg} from "../helpers/translate";
import email from '../assets/img/icon/UserIcon.svg'
import plus from "../assets/img/icon/plus.png";
import {toast} from "react-toastify";
import x from "../assets/img/icon/x.svg";
import InputMask from 'react-input-mask';
import {useParams} from "react-router";
import 'react-phone-number-input/style.css'
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import company from '../assets/img/icon/img.avif'
import mail from '../assets/img/icon/img_1.avif'
import department from '../assets/img/icon/department.avif'
function Register(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({
        company: '',
        phone: '',
        email: '',
        position: '',
        fullName: ''
    })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const params = useParams();
    const handleChange = useCallback((name, value) => {
        setForm((prev) => ({...prev, [name]: value}))
    }, [])
    const handleRegister = useCallback(async () => {
        try {
            if (!form.phone || !isValidPhoneNumber(form.phone)) {
                toast.error('Phone is not valid');
                return;
            }
            if (!form.company || !form.email || !form.fullName || !form.position) {
                toast.error('Please fill all rows');
                return;
            }

        } catch (e) {

        }
    }, [form, windowWidth])
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

            <div className="big_screen">
                <div className="login_container"/>
                <div className="login">
                    <div className="login_header">
                        <p>
                            {log_reg.sign[lang[params?.lang || 'en']]}
                        </p>
                        <span onClick={removeHash} style={{cursor: 'pointer'}}>
                            <img src={x} alt=''/>

                        </span>
                    </div>
                    <div className="login_block">
                        <div>
                            <div className="login_block_input">
                                <div>
                                    <label>
                                        <img width="17" height="17" src={company} alt=""/>
                                        <input placeholder={input.company[lang[params?.lang || 'en']]}
                                               onChange={(ev) => handleChange('company', ev.target.value)}
                                               value={form.company}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <img src={email} alt=""/>
                                        <input placeholder={input.name[lang[params?.lang || 'en']]}
                                               onChange={(ev) => handleChange('fullName', ev.target.value)}
                                               value={form.fullName}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <img width="17" height="17" src={department} alt=""/>
                                        <input placeholder={input.position[lang[params?.lang || 'en']]}
                                               onChange={(ev) => handleChange('position', ev.target.value)}
                                               value={form.position}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <img width="17" height="17" src={mail} alt=""/>
                                        <input placeholder={input.email[lang[params?.lang || 'en']]}
                                               onChange={(ev) => handleChange('email', ev.target.value)}
                                               value={form.email}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <PhoneInput
                                            international
                                            defaultCountry="US"
                                            placeholder={buttons.email[lang[params?.lang || 'en']]}
                                            value={form.phone}
                                            onChange={(ev) => handleChange('phone',ev)}/>
                                    </label>
                                </div>
                                <div>
                                    <p>{log_reg.desc[lang[params?.lang || 'en'] || 1]}</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div>
                                <button onClick={handleRegister} className="register_btn">
                                    <img src={plus} alt=''/>
                                    {buttons.reg[lang[params?.lang || 'en'] || 1]}
                                </button>
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

                </div>
            </div>

        )
    }

}

export default Register;
