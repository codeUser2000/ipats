import React, {useCallback, useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import copyRight from '../assets/img/footer/copyright.png'
import copyRight2 from '../assets/img/footer/Copyright © 2024.svg'
import footerLogo from '../assets/img/footer/footer_logo.png'
import footerLogo2 from '../assets/img/footer/itspark.svg'
import appstore from '../assets/img/footer/AppStoreIcon.svg'
import playstore from '../assets/img/footer/PlayStoreIcon.svg'
import headerLogo from '../assets/img/header/header_logo.svg'
import userIcon from '../assets/img/icon/user.svg'
import {buttons, footer, homeD, menu,lang} from "../helpers/translate";
import smallIcon from '../assets/img/block/small_logo.svg'
import menuIcon from '../assets/img/icon/Buterbrod.svg'
import AsideMenu from "./AsideMenu";
import big from "../assets/img/icon/Arrow 1.svg";
import small from "../assets/img/icon/Arrow 2.svg";
import ru from '../assets/img/icon/fr.png'
import us from '../assets/img/icon/us.svg'
import down from '../assets/img/icon/down.svg'
import Register from "../page/Register";
import {useLocation, useNavigate, useParams} from "react-router";
import Confirm from "../page/Confirm";
import telegram from '../assets/img/icon/telegram.avif'
import Utils from "../helpers/Utils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

function Wrapper({children}) {
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const [menuList, setMenu] = useState(false)
    const [see, setSee] = useState(false)
    const handleSetLink = useCallback((link) => {
        localStorage.setItem('ats_link', link)
    }, [])
    const handleLangChange = useCallback((lang, val) => {
        localStorage.setItem('ipatsLang', lang)
        let path = location.pathname
        navigate(path.replace(params.lang, val))
    }, [params, location.pathname])
    useEffect(() => {
        if (!localStorage.getItem('ipatsLang')) {
            localStorage.setItem('ipatsLang', '1')
        }
    }, []);
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
    const [showRegister, setShowRegister] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (location.hash === '#register') {
            setShowRegister(true);
            setShowConfirm(false);
        } else if (location.hash === '#drop') {
            setShowRegister(false);
            setShowConfirm(false)
        } else if (location.hash === '#registered') {
            setShowRegister(false);
            setShowConfirm(true);
        } else {
            setShowRegister(false);
            setShowConfirm(false);
        }

    }, [location.hash]);
    return (
        <>
            <header className="header">
                {windowWidth > 786 ? <>
                    <div>
                        <figure>
                            <Link to={`/${Utils.lang()}`} className="d-flex">
                                <img src={headerLogo} alt={"Go to home"}/>
                            </Link>
                        </figure>
                        <div className="flex-column m-0 nav_col">
                            <nav className="d-flex flex-row w-100 justify-content-end">
                                <ul className="header_nav nav_top">

                                    <li onClick={() => handleSetLink(menu[4].link)}><Link
                                        to={`/${Utils.lang()}${menu[4].link}`}>
                                        <img src={menu[4].icon} alt=""/>
                                        {menu[4].trans[lang[params?.lang || 'en'] || 1]}
                                    </Link></li>
                                </ul>
                                <section className="header_nav nav_bottom">
                                    <Link to={`${menu[5].link}`} className="simple_btn_outline">
                                        <span>{buttons.top[lang[params?.lang || 'en'] || 1]}</span>
                                    </Link>
                                    <p style={{width: 100}}/>
                                </section>
                                <div className="select_lang">
                                    <div className="selected_lang">
                                        <img
                                            src={+lang[params?.lang || 'en'] === 1 ? us : ru}
                                            alt=""/>
                                        <img className="down" src={down} alt=""/>
                                    </div>
                                    <ul className="lang_select">
                                        {+lang[params?.lang || 'en'] !== 4 ?
                                            <li onClick={() => handleLangChange(4, 'fr')}><img src={ru} alt=""/>
                                            </li> : null}
                                        {+lang[params?.lang || 'en'] !== 1 ?
                                            <li onClick={() => handleLangChange(1, 'en')}><img src={us} alt=""/>
                                            </li> : null}
                                    </ul>
                                </div>
                            </nav>
                            <nav>
                                <ul className="header_nav">
                                    {menu.map((l, i) => {
                                        if (i <= 3) {
                                            if (l.isParent) {
                                                return (
                                                    <li key={l.id}>
                                                        <menu className="parent_span position-relative overflow-hidden"
                                                        >
                                                            <li className="parent_li"
                                                                onClick={() => setSee(!see)}
                                                                key={l.id}>
                                                            <span>
                                                                <img src={l.icon} alt=""/>
                                                                {l.trans[lang[params?.lang || 'en'] || 1]}
                                                            </span>
                                                            </li>
                                                            <ul className={see ? "header_nav_child see" : "header_nav_child"}>
                                                                {l.child.map(r => (
                                                                    <li onClick={() => handleSetLink(r.link)} key={r.link}>
                                                                        <NavLink className="header_nav_child_a" to={`/${Utils.lang()}${r.link}`}>
                                                                            <div>
                                                                                <img
                                                                                    className={window.location.pathname === `/${Utils.lang()}${r.link}` ? '_big' : '_small'}
                                                                                    src={window.location.pathname === `/${Utils.lang()}${r.link}` ? big : small}
                                                                                    alt=""/>

                                                                                {r.trans[lang[params?.lang || 'en'] || 1]}
                                                                            </div>
                                                                            <img src={r.icon} alt=""/>

                                                                        </NavLink>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </menu>
                                                    </li>
                                                )
                                            } else {
                                                if (l.trans[+lang[params?.lang || 'en'] || 1]) {
                                                    return (
                                                        <li onClick={() => handleSetLink(l.link)} key={l.id}><Link
                                                            to={`/${Utils.lang()}${l.link}`}>
                                                            <img src={l.icon} alt={"Go to" + l.trans[lang[params?.lang || 'en'] || 1]}/>
                                                            {l.trans[lang[params?.lang || 'en'] || 1]}
                                                        </Link></li>
                                                    )
                                                }

                                            }

                                        }
                                    })}
                                </ul>
                            </nav>

                        </div>
                    </div>
                </> : <div>
                    <figure>
                        <Link to={`/${Utils.lang()}`} className="d-flex">
                            <img src={smallIcon} alt='Go to home'/>
                        </Link>
                    </figure>
                    <div className="m-0 align-items-center">
                        <Link to={`/${Utils.lang()}${menu[5].link}`} className="simple_btn_outline">
                            <span>{buttons.top[lang[params?.lang || 'en'] || 1]}</span>
                        </Link>
                        <img onClick={() => setMenu(!menuList)} src={menuIcon} alt=''/>
                    </div>
                </div>
                }
            </header>
            <main className="main">
                {children}
            </main>
            <footer className="footer">
                <div className="row footer_block">
                    <div className="col-md-3">
                        <figure className="footer_logo_figure">
                            <img alt='' src={footerLogo}/>
                            {windowWidth <= 435 ? <figure>
                                <img className="wi-150" src={copyRight2} alt=''/>
                                <img className="wi-150" src={footerLogo2} alt=''/>
                            </figure> : null}
                        </figure>
                        <div>
                            <nav className="footer_nav">
                                <ul>
                                    <li><Link
                                        to={`/${Utils.lang()}/about`}>{footer.check[lang[params?.lang || 'en'] || 1]}</Link>
                                    </li>

                                    <li><Link
                                        to={`/${Utils.lang()}/crm`}>{footer.crm[lang[params?.lang || 'en'] || 1]}</Link>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <nav className="footer_nav">
                            <ul>

                                <li><Link
                                    to={windowWidth > 786 ? '#register' : `/${Utils.lang()}/register`}>{footer.reg[lang[params?.lang || 'en'] || 1]}</Link>
                                </li>

                                <li><Link
                                    to={`/${Utils.lang()}/single_service/local`}>{footer.install[lang[params?.lang || 'en'] || 1]}</Link>
                                </li>

                                <li><Link
                                    to={`/${Utils.lang()}/api_document`}>{footer.api[lang[params?.lang || 'en'] || 1]}</Link>
                                </li>

                            </ul>
                        </nav>
                        {windowWidth <= 435 ? <p className="footer_text">
                            {footer.copyright[lang[params?.lang || 'en'] || 1]} <Link
                            to={`/${Utils.lang()}/about`}>{footer.learn[lang[params?.lang || 'en'] || 1]}</Link>
                        </p> : null}
                    </div>
                    <div className="col-md-3 col-sm-6 download">
                        {windowWidth > 435 ? <div className="d-flex">
                            <div>
                                <div className="p">
                                    {homeD.download_wrapper[lang[params?.lang || 'en'] || 1]}
                                </div>
                                <span>
                                    {homeD.download_desc[lang[params?.lang || 'en'] || 1]}
                                </span>

                            </div>

                        </div> : null}
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="p">
                            <div>
                                <a className="app" target="_blank"
                                   href="https://apps.apple.com/am/app/ipats-client/id6468366668"
                                >
                                    <img src={appstore} alt='Download IOS'/>
                                </a>
                                <a className="app" target="_blank"
                                   href="https://play.google.com/store/apps/details?id=am.ats.ipats_client&pcampaignid=web_share"
                                >
                                    <img src={playstore} alt='Download APK'/>
                                </a>
                            </div>
                            <div className="d-flex">
                                <span className="brand_icon">
                                    <a className="d-flex justify-content-center w-100" href="http://fb.com/people/ATSAM-virtual-pbx/61555766517673/">
                                        <FontAwesomeIcon icon={faFacebookF}/>
                                    </a>
                                </span>
                                <span className="brand_icon">
                                    <a className="d-flex justify-content-center w-100" href='https://www.instagram.com/ats.am_/'>
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </a>
                                </span>
                                <span className="brand_icon">
                                    <a className="d-flex justify-content-center w-100" href="https://www.linkedin.com/company/ats-am/">
                                        <FontAwesomeIcon icon={faLinkedinIn}/>
                                    </a>
                                </span>
                            </div>
                            <div className="download">
                                <a className="inform" href="mailto:info@ats.am">info@ats.am</a>
                                <a className="inform" href="tel:+37444720101">+37444720101</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="telegram_chat_block"><p className="chat_text">24/7</p>
                    <img className="telegram_chat" onClick={() => window.location.href = "https://t.me/ats_am_bot"}
                         src={telegram} alt=""/></div>
            </footer>
            {windowWidth >= 768 ? null : <AsideMenu setVisible={setMenu} visible={menuList}/>}
            {showRegister ? <Register/> : null}
            {showConfirm ? <Confirm/> : null}
        </>
    );
}

export default Wrapper;
