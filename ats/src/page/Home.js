import React, {useEffect, useState} from 'react';
import Wrapper from "../component/Wrapper";
import Slider from "react-slick";
import Api from "../Api";
import _ from 'lodash'
import {Link} from "react-router-dom";
import plus from '../assets/img/icon/plus.png'
import ClientBlock from "../component/ClientBlock";
import Solution from "../component/Solution";
import Stories from "../component/Stories";
import InstallPbx from "../component/InstallPbx";
import appstore from "../assets/img/icon/apple.svg";
import playstore from "../assets/img/icon/android.svg";
import {buttons, homeD, lang} from "../helpers/translate";
// const {REACT_APP_API_URL} = process.env;
import {REACT_APP_API_URL} from '../config'
import {Helmet} from "react-helmet";
import Utils from "../helpers/Utils";
import Loader from "../component/Loader";
import img from "../assets/img/block/LogoHosted.svg";
import operators from "../assets/img/icon/operator.avif";
import {useParams} from "react-router";



function Home() {
    const [home, setHome] = useState({})
    const [service, setService] = useState([])
    const [feature, setFeature] = useState({})
    const params = useParams()

    const [operator, setOperator] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px",
                }}
            >
                <ul className="carousel_banner_dot" style={{margin: "0px"}}> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "15px",
                    height: "15px",
                    overflow: 'hidden'
                }}
            />
        )
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [loader, setLoader] = useState(true)
    const [backgroundImage, setBackgroundImage] = useState('')
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.getHome(lang[params?.lang || 'en'] || 1)
                setHome(data.home)
                setBackgroundImage(`${REACT_APP_API_URL}${data.home.image}`)
                const feat = await Api.getFeature(lang[params?.lang || 'en'] || 1)
                setFeature(feat.data.updatedServiceTranslate.home_translate[0])
                const service = await Api.getService(lang[params?.lang || 'en'] || 1)
                const chunks = [];
                const chunkSize = windowWidth > 1024 || windowWidth <= 560 ? 4 : 8;

                for (let i = 0; i < service.data?.service?.length; i += chunkSize) {
                    chunks.push(service.data?.service?.slice(i, i + chunkSize));
                }
                if (data.home && data.home.image) {
                    const imageUrl = REACT_APP_API_URL + data.home.image;

                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = imageUrl;
                    link.as = 'image';
                    document.head.appendChild(link);
                }
                setService(chunks)
                const partner = await Api.getPartner(lang[params?.lang || 'en'] || 1)
                setOperator(partner.data)

                setLoader(false)
            } catch (e) {

            }
        })()
    }, [windowWidth,params,lang,REACT_APP_API_URL])
    if (loader) {
        return (
            <Loader />
        );
    } else {
        return (
            <Wrapper>
                <Helmet>
                    <title>IP-ATS</title>
                </Helmet>
                <div className="main_container top_banner"
                     style={backgroundImage && windowWidth > 1024 ? {backgroundImage: `url(${backgroundImage})`} : {}}>
                    <div className="top_banner_content">
                        <h3>{!_.isEmpty(home) ? home?.home_translate[0]?.title?.replaceAll('ats.am','ip-ats') : ''}</h3>
                        <p className="top_banner_p"
                           dangerouslySetInnerHTML={{__html: !_.isEmpty(home) ? home?.home_translate[0]?.desc : ''}}/>
                        <Link to={windowWidth > 786?'#register':`/${Utils.lang()}/register`} className="register_btn">
                            <img src={plus} alt=''/>
                            {buttons.reg[+lang[params?.lang || 'en'] || 1]}
                        </Link>
                    </div>
                    <div className="top_banner_image">
                        <img
                            style={
                                windowWidth <= 370? +lang[params?.lang || 'en'] === 3 ? {objectPosition: -330} : +lang[params?.lang || 'en'] === 2 ? {objectPosition: -330} : {} :
                                windowWidth <= 400 && windowWidth >=370 ? +lang[params?.lang || 'en'] === 3 ? {objectPosition: -300} : +lang[params?.lang || 'en'] === 2 ? {objectPosition: -290} : {}:
                                windowWidth < 550? +lang[params?.lang || 'en'] === 3 ? {objectPosition: -245} : +lang[params?.lang || 'en'] === 2 ? {objectPosition: -230} : {} : null}
                            className='top_banner_img' alt=''
                            src={!_.isEmpty(home) ? REACT_APP_API_URL + home?.image : ''}/>
                    </div>
                </div>

                <ClientBlock isHome={true}/>
                {windowWidth <= 435 ?
                    <div className="solution_install">
                        <InstallPbx home={true}/>
                        <Solution/>

                    </div>
                    : null
                }
                {windowWidth > 435 ?
                    <Solution isHome={true}/>
                    : null
                }
                <div className="carousel_banner">
                    <div className="carousel_banner_1">
                        <div style={{paddingBottom: 0}}>
                            <h3>{feature?.title?.replaceAll('ATS.AM','Ip-ats.com')}</h3>
                            <p dangerouslySetInnerHTML={{__html: feature?.desc?.replaceAll('ATS.AM','Ip-ats.com')}}/>
                        </div>
                        <Slider {...settings}>
                            {service?.map((s, i) => (
                                <div key={i}>

                                    <div className="carousel_banner_service">
                                        {s.map(el => (
                                            <div key={el.icon}>
                                                <img loading="lazy" src={REACT_APP_API_URL + el.icon} alt=''/>
                                                <div className="text">
                                                    <h4>
                                                        <Link style={{color:'black'}} to={`/single_service${el?.link}`}>{el.new_service_translate[0].title?.replaceAll('ATS.AM','Ip-ats.com')}</Link>
                                                    </h4>
                                                    <p>
                                                        {el.new_service_translate[0].descShort?.replaceAll('ATS.AM','Ip-ats.com')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            ))}

                        </Slider>
                    </div>
                    {windowWidth > 1024 ? <Stories/> : null}
                </div>
                {windowWidth <= 1024 ?
                    <div className="carousel_banner resized">
                        <Stories isHome={windowWidth > 550}/>
                        <div className="main_container service_host_block">
                            <div className="operator">
                                <h3>{operator?.partner?.home_translate[0]?.title?.replaceAll('ATS.AM','Ip-ats.com')}</h3>
                                <figure className="d-flex align-items-center justify-content-center">
                                    <img loading="lazy" src={operators} alt=''/>
                                </figure>
                                <p>{operator?.partner?.home_translate[0]?.desc?.replaceAll('ATS.AM','Ip-ats.com')}</p>
                            </div>
                            {windowWidth > 560 ? <InstallPbx home={true}/> : null}
                        </div>
                    </div> : null}
                {windowWidth > 1024 ?
                    <div className="main_container service_host_block">
                        <div className="operator">
                            <h3>{operator?.partner?.home_translate[0]?.title?.replaceAll('ATS.AM','Ip-ats.com')}</h3>
                            <div>{operator?.partnerImages?.map(p => (
                                <figure key={p.path}><img loading="lazy" src={REACT_APP_API_URL + p.path} alt=''/></figure>
                            ))}</div>
                            <p>{operator?.partner?.home_translate[0]?.desc?.replaceAll('ATS.AM','Ip-ats.com')}</p>
                        </div>
                        <InstallPbx home={true}/>
                    </div> : null}
                {windowWidth <= 560 ?
                    <div className="download_block">
                        <div>
                            <h3>
                                {homeD.download_wrapper[lang[params?.lang || 'en']]?.replaceAll('ATS.AM','Ip-ats.com')}

                            </h3>
                            <span>
                            {homeD.download_desc[lang[params?.lang || 'en']]?.replaceAll('ATS.AM','Ip-ats.com')}
                        </span>
                        </div>
                        <div style={{marginLeft: 20, margin: 30}}
                             className="d-flex align-items-baseline justify-content-center">
                            <a target="_blank" href="https://apps.apple.com/am/app/ipats-client/id6468366668"
                               style={{display: 'inline-block', margin: '0 20px'}}>
                                <img src={appstore} alt="Download Android"/>
                            </a>
                            <a target="_blank"
                               href="https://play.google.com/store/apps/details?id=am.ats.ipats_client&pcampaignid=web_share"
                               style={{display: 'inline-block', margin: '0 20px'}}>
                                <img src={playstore} alt="Download IOS"/>
                            </a>
                        </div>
                    </div> : null}
            </Wrapper>
        );
    }

}

export default Home;
