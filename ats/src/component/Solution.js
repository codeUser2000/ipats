import React, {useEffect, useState} from 'react';
import Api from "../Api";
import {homeD,lang} from '../helpers/translate'
import {Link} from "react-router-dom";
import poster from '../assets/img/block/poster.avif'
import Utils from "../helpers/Utils";
import {useParams} from "react-router";
function Solution({isHome}) {
    const [video,setVideo] = useState({})
    const params = useParams()
    useEffect(() => {
        (async () => {
            const {data} = await Api.getVideo(lang[params?.lang || 'en'] || 1)
            setVideo(data.video.home_translate[0])
        })()
    }, [params,lang])
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
    return (
        <div className={isHome?"main_container"+" solution":'solution'}>
               <div>
                   <h3 className="solution_title">
                       {video.title}
                   </h3>
                   {!isHome?<video
                       className="solution_video"
                       src={+lang[params?.lang || 'en'] === 1 ?"https://ats.am/ats-eng.mp4": +lang[params?.lang || 'en'] === 2?"https://ats.am/ats-ru.mp4":"https://ats.am/ats.mp4"}
                       controls
                       preload="metadata"
                       poster={poster}
                   >
                       Your browser does not support the video tag.
                   </video>:null}

                   {windowWidth > 435 ?<p className="solution_p" dangerouslySetInnerHTML={{__html:video.desc}}/>:null}
                   <p className="solution_p">
                       {homeD.solution[lang[params?.lang || 'en'] || 1].split('|')[0]} <Link to={windowWidth > 786?'#register':`/${Utils.lang()}/register`}>{homeD.solution[lang[params?.lang || 'en'] || 1].split('|')[1]}</Link>
                   </p>
               </div>
            {isHome?<div className="d-flex justify-content-end align-items-center">
                   <video
                       className="solution_video"
                       src={+lang[params?.lang || 'en'] === 1 ?"https://ats.am/ats-eng.mp4": +lang[params?.lang || 'en'] === 2?"https://ats.am/ats-ru.mp4":"https://ats.am/ats.mp4"}
                       controls
                       preload="metadata"
                       poster={poster}
                   >
                       Your browser does not support the video tag.
                   </video>
               </div>:null}
        </div>
    );
}

export default Solution;
