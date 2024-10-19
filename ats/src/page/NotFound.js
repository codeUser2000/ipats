import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link, NavLink} from "react-router-dom";

function NotFound(props) {
    let [lang,setLang] = useState('en')
    useEffect(() => {
        if(+localStorage.getItem('ipatsLang') === 1){
            setLang('en')
        }else if(+localStorage.getItem('ipatsLang') === 2){
            setLang('ru')
        }else{
            setLang('hy')
        }
    }, [])
    return (
        <>
            <Helmet>
                Not found
            </Helmet>
            <div className="notFound">
                <h2>404</h2>
                <p>Page not found</p>
                <Link to={`/${lang}`}>Go Home</Link>
            </div>
        </>
    );
}

export default NotFound;
