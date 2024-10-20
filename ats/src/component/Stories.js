import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import Api from "../Api";
import {REACT_APP_API_URL} from '../config'
import Utils from "../helpers/Utils";
import {useParams} from "react-router";
import {lang} from "../helpers/translate";

function Stories({isHome}) {
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
    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: windowWidth < 1024 && isHome ? 1.1 : 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px",
                }}
            >
                <ul className="carousel_banner_dot m-0 p-0"> {dots} </ul>
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
    const params = useParams()
    const [result, setResult] = useState([])
    useEffect(() => {
        (async () => {
            const {data} = await Api.getNewSlideResult(lang[params?.lang || 'en'] || 1)
            setResult(Utils.shuffleArray(data.slide))
        })()
    }, [params,lang])
    return (
        <div className={isHome ? 'carousel_banner_2 ishome' : 'carousel_banner_2'}>
             <h4 style={{
                textAlign: windowWidth > 1024 || windowWidth < 560?'center':'left',
                margin: '16px 55px 0'
            }}>{result[0]?.slider_data_translate[0]?.title?.replaceAll('ATS.AM','Ip-ats.com')}</h4>

            <Slider {...settings1}>
                {result?.map(r => (
                    <div className='carousel_banner_dev' key={r.id}>
                        {/*{windowWidth > 992 ? <h4>{r.slider_data_translate[0].title}</h4> : null}*/}
                        <div className="carousel_banner_img_block">
                            <figure>
                                <img src={REACT_APP_API_URL + r.image} alt=''/>
                            </figure>
                            <p className="text_center carousel_banner_p"
                               dangerouslySetInnerHTML={{__html: r.slider_data_translate[0].desc.split('</p>')[1]?.replaceAll('ATS.AM','Ip-ats.com')}}/>
                        </div>
                    </div>
                ))}

            </Slider>
        </div>
    );
}

export default Stories;
