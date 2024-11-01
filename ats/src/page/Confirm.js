import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {lang, input, log_reg, } from "../helpers/translate";
import qs from "query-string";
import x from "../assets/img/icon/x.svg";
import {Helmet} from "react-helmet";

function Confirm(props) {
    const location = useLocation()
    const params = useParams

    const query = qs.parse(location.search, {arrayFormat: 'comma'});
    const handleRedirect = useCallback(async () => {
        window.location.href = `https://account.ats.am/registration?phone=${query.phone}`
    }, [location.search])
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
    const navigate = useNavigate()
    const removeHash = () => {
        navigate(location.pathname);
    };
    if (windowWidth > 786) {
        return (
           <>
               <Helmet>
                   <meta name="robots" content="noindex, nofollow" />
               </Helmet>
               <div className="big_screen">
                   <div className="login_container"/>
                   <div className="login" style={{height: 270}}>
                       <div className="login_header">
                           <p className="w-50">
                               {log_reg.regT[lang[params?.lang || 'en'] || 1]}
                           </p>
                           <span onClick={removeHash} style={{cursor:'pointer'}}>
                                <img src={x} alt=''/>
                            </span>
                       </div>
                       <div className="login_block">
                           <div>
                               <div className="login_block_input">

                                   <p style={{margin: '24px 0'}} className="login_block_text">{log_reg.regD[lang[params?.lang || 'en'] || 1]}</p>
                                   <p>{input.telegram[lang[params?.lang || 'en'] || 1]}</p>

                               </div>
                           </div>
                           <button onClick={handleRedirect} className="register_btn">
                               {log_reg.check[lang[params?.lang || 'en'] || 1]}
                           </button>
                       </div>
                   </div>
               </div>
           </>
        );
    }else {
        return (
            <>
                <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <div className="login">
                    <div className="login_header justify-content-end">

                        <Link to={localStorage.getItem('ats_link') || '/'}>
                            <img src={x} alt=''/>
                        </Link>
                    </div>
                    <div className="login_header">
                        <p className="w-50">
                            {log_reg.regT[lang[params?.lang || 'en'] || 1]}
                        </p>
                    </div>
                    <div className="login_block">
                        <div>
                            <div className="login_block_input">

                                <p className="login_block_text">{log_reg.regD[lang[params?.lang || 'en'] || 1]}</p>
                                <p>{input.telegram[lang[params?.lang || 'en'] || 1]}</p>

                            </div>
                        </div>
                        <button onClick={handleRedirect} className="register_btn">
                            {log_reg.check[lang[params?.lang || 'en'] || 1]}
                        </button>
                    </div>
                </div>
            </>
        )

    }

}

export default Confirm;
