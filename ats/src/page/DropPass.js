import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {buttons, lang, log_reg} from "../helpers/translate";
import email from '../assets/img/icon/UserIcon.svg'
import pass from '../assets/img/icon/PasswordIcon.svg'
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import x from "../assets/img/icon/x.svg";
import InputMask from 'react-input-mask';
import Utils from "../helpers/Utils";
import {useParams} from "react-router";

function DropPass(props) {
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const handleSubmit = useCallback(async (ev) => {
        try {
            ev.preventDefault()
            let newPhone = phone.replaceAll(' ','').replace('(','').replace(')','').replace('+','').replaceAll('-','')
            const scientificPattern = /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/;
            let ok = scientificPattern.test(newPhone);
            if(ok){
                await axios.post('https://account.ats.am/users/drop_pass', {
                    phone:newPhone,
                });
                navigate('/login')

            }else{
                toast.error('Not right format.All characters need to be numbers')
            }

        }catch (e) {
            toast.error(e.response.data.message)
        }
    }, [phone])
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
    const location = useLocation()
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
                                {log_reg.reset[lang[params?.lang || 'en'] || 1]}
                            </p>
                            <span onClick={removeHash} style={{cursor:'pointer'}}>
                                <img src={x} alt=''/>
                            </span>
                        </div>
                        <div className="login_block">
                            <div>
                                <form onSubmit={handleSubmit} className="login_block_input" style={{width: ' 85%'}}>
                                    <div style={{width: ' 55%'}}>
                                        <label>
                                            <img src={email} alt=""/>
                                            <InputMask
                                                mask="374 (99) 999999"
                                                maskChar="_"
                                                placeholder={buttons.email[lang[params?.lang || 'en'] || 1]}
                                                // placeholder="374 (__) ______"
                                                onChange={(ev) => setPhone(ev.target.value)}
                                                value={phone}
                                            >
                                                {(inputProps) => <input {...inputProps} />}
                                            </InputMask>
                                        </label>
                                    </div>
                                    <p style={{width: ' 60%',}}>
                                        {log_reg.descRes[lang[params?.lang || 'en'] || 1]}
                                    </p>
                                    <div>
                                        <button onClick={handleSubmit} className="simple_btn">
                                            <img src={pass} alt=""/>
                                            <span>{buttons.res[lang[params?.lang || 'en'] || 1]}</span>
                                        </button>
                                        <Link to='#login'>
                                            {log_reg.logRet[lang[params?.lang || 'en'] || 1]}
                                        </Link>
                                    </div>
                                </form>

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
                        x
                    </Link>
                </div>
                <div className="login_header">
                    <p>
                        {log_reg.reset[lang[params?.lang || 'en'] || 1]}
                    </p>

                </div>
                <div className="login_block">
                    <div>
                        <form onSubmit={handleSubmit} className="login_block_input">
                            <div>
                                <label>
                                    <img src={email} alt=""/>
                                    <InputMask
                                        mask="374 (99) 999999"
                                        maskChar="_"
                                        placeholder={buttons.email[lang[params?.lang || 'en'] || 1]}
                                        // placeholder="374 (__) ______"
                                        onChange={(ev) => setPhone(ev.target.value)}
                                        value={phone}
                                    >
                                        {(inputProps) => <input {...inputProps} />}
                                    </InputMask>
                                </label>
                            </div>
                            <div>
                                <button onClick={handleSubmit} className="simple_btn">
                                    <img src={pass} alt=""/>
                                    <span>{buttons.res[lang[params?.lang || 'en'] || 1]}</span>
                                </button>
                                <Link to={`/${Utils.lang()}/login`}>
                                    {log_reg.logRet[lang[params?.lang || 'en'] || 1]}
                                </Link>
                            </div>
                        </form>

                    </div>

                </div>
            </div>

        )
    }

}

export default DropPass;
