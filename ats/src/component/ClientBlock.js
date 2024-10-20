import React, {useEffect, useState} from 'react';
import Api from "../Api";
import _ from 'lodash'
import {REACT_APP_API_URL} from '../config'
import {lang} from "../helpers/translate";
import {useParams} from "react-router";

function ClientBlock({isHome}) {
    let params = useParams()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(windowWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [client,setClient] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.client(lang[params?.lang || 'en'] || 1)
                setClient({images:data.clientImages.slice(0, isHome?6:8),data:data.client})
            }catch (e) {

            }
        })()
    }, [isHome,lang,params])
    return (
        <>
            {isHome && windowWidth <= 1024?<hr className="first_hr"/>:null}
            <div className={isHome?"main_container"+" client":'clients'} >
                <div className="client_title">
                    <p>{isHome && !_.isEmpty(client)?client?.data?.home_translate[0].title?.replaceAll('ATS.AM','Ip-ats.com'):!_.isEmpty(client)?client?.data?.home_translate[0].desc?.replaceAll('ATS.AM','Ip-ats.com'):''}</p>
                </div>
                <div className="client_top_figure">
                    {client.images?client.images.map(i => <figure className="client_figure" key={i.id}><img src={REACT_APP_API_URL + i.path} alt=''/></figure>):null}
                </div>
            </div>
            {isHome && windowWidth > 1024?<div className="main_container">
                <hr/>

            </div>:isHome && windowWidth > 426?<hr/>:null}
        </>
    );
}

export default ClientBlock;
