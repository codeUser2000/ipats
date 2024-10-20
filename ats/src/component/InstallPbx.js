import React, {useEffect, useState} from 'react';
import {homeD,lang} from "../helpers/translate";
import logo from '../assets/img/block/Group 45 (1).svg'
import {Link} from "react-router-dom";
import Utils from "../helpers/Utils";
import {useParams} from "react-router";

function InstallPbx({home}) {
    const params = useParams()
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
        <div className="install">
            <div className={home?'home':''}>
                {windowWidth > 435 && home?<div className="d-flex w-100">
                    <h3>
                        {homeD.operator?.title[lang[params?.lang || 'en'] || 1]?.replaceAll('ATS.AM','Ip-ats.com')}
                    </h3>
                    <figure>
                        <img src={logo} alt=''/>


                    </figure>

                </div>:<h3>
                    {homeD.operator?.title[lang[params?.lang || 'en'] || 1]?.replaceAll('ATS.AM','Ip-ats.com')}
                </h3>}
                <p>{homeD.operator?.desc[lang[params?.lang || 'en'] || 1]?.replaceAll('ATS.AM','Ip-ats.com')}</p>

            </div>
            {windowWidth <= 426?<figure >
                <img src={logo} alt=''/>
                <figcaption>
                    <Link to={`/${Utils.lang()}/single_service/local`}>
                        {homeD.download[lang[params?.lang || 'en'] || 1]}
                    </Link>
                </figcaption>
            </figure>:null}

        </div>
    );
}

export default InstallPbx;
