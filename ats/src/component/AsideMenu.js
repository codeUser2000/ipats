import React, {useCallback, useState} from 'react';
import x from '../assets/img/icon/x.svg'
import {buttons, homeD, menu,lang} from "../helpers/translate";
import {Link, NavLink} from "react-router-dom";
import userIcon from "../assets/img/icon/user.svg";
import plus from "../assets/img/icon/PasswordIcon.svg";
import big from "../assets/img/icon/Arrow 1.svg";
import small from "../assets/img/icon/Arrow 2.svg";
import us from "../assets/img/icon/us.svg";
import ru from "../assets/img/icon/fr.png";
import arm from "../assets/img/icon/arm.svg";
import down from "../assets/img/icon/down.svg";
import {useNavigate, useParams} from "react-router";
import Utils from "../helpers/Utils";

function AsideMenu({visible, setVisible}) {
    const [see, setSee] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const handleLangChange = useCallback((lang,val) => {
        localStorage.setItem('ipatsLang', lang)
        let path = location.pathname
        navigate(path.replace(params.lang, val))
        // window.location.reload()
    }, [params, location.pathname])
    return (
        <div className="aside_menu" style={visible ? {right: 0} : {right: '-100vw'}}>
            <div className="close">
                <div className="select_lang">
                    <div className="selected_lang">
                        <img
                            src={+lang[params?.lang || 'en'] === 4 ? ru : us}
                            alt=""/>
                        <span>{+lang[params?.lang || 'en'] === 1 ? 'English' :  'France' }</span>
                        <img className="position-absolute" style={{right:0,top:5}} src={down} alt=""/>
                    </div>
                    <ul className="lang_select">
                        {+lang[params?.lang || 'en'] !== 4 ?
                            <li onClick={() => handleLangChange(4,'fr')}><img src={ru} alt=""/>
                                <span>France</span>
                            </li> : null}
                        {+lang[params?.lang || 'en'] !== 1 ?
                            <li onClick={() => handleLangChange(1,'en')}><img src={us} alt=""/>
                                <span>English</span>
                            </li> : null}
                    </ul>
                </div>
                <img alt='' onClick={() => setVisible(false)} src={x}/>
            </div>
            <div>
                <nav>
                    <ul className="aside_nav">
                        {menu.map((l, i) => {
                            if (i < 5) {
                                if (l.isParent) {
                                    return (
                                        <li key={l.id} className="w-100 p-0">
                                            <ul className="w-100 p-0">
                                                <li onClick={() => {
                                                    setSee(!see)
                                                }} className="parent_li" ><span>
                                            <img src={l.icon} alt=""/>
                                                    {l.trans[lang[params?.lang || 'en'] || 1]}
                                        </span>


                                                </li>
                                                <li className="p-0"><ul style={see ? {} : {border: 'none'}} className="aside_nav_child w-100  border-0">
                                                    {see ? l.child.map((r) => (
                                                        <li key={r.link} onClick={() => {
                                                            setVisible(false)
                                                        }}><NavLink to={`/${Utils.lang()}${r.link}`}>
                                                            <div>
                                                                <img
                                                                    className={window.location.pathname === `/${Utils.lang()}${r.link}` ? '_big' : '_small'}
                                                                    src={window.location.pathname === `/${Utils.lang()}${r.link}` ? big : small}
                                                                    alt={"Go to" + r.link}/>

                                                                {r.trans[lang[params?.lang || 'en'] || 1]}
                                                            </div>
                                                            <img src={r.icon} alt={"Go to" + r.link}/>

                                                        </NavLink>
                                                        </li>
                                                    )) : null}
                                                </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={l.id} onClick={() => {
                                        }}><NavLink to={`/${Utils.lang()}${l.link}`}>
                                            <img src={l.icon} alt={"Go to" + l.link}/>
                                            {l.id === 1 && +lang[params?.lang || 'en'] === 3?'Գլխավոր':l.trans[lang[params?.lang || 'en'] || 1]}
                                        </NavLink></li>
                                    )
                                }
                            }


                        })}
                    </ul>
                </nav>
            </div>
            <div className="aside_auth">

                <h3>
                    {homeD.register[lang[params?.lang || 'en'] || 1]}
                </h3>
                <Link to={`/${Utils.lang()}/register`} className="register_btn">
                    <img src={plus} alt={"Go to register"}/>
                    {buttons.top[lang[params?.lang || 'en'] || 1]}
                </Link>
            </div>
        </div>
    );
}

export default AsideMenu;
