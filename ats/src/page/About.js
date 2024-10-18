import React, {useEffect, useState} from 'react';
import Wrapper from "../component/Wrapper";
import {menu,lang} from "../helpers/translate";
import {Helmet} from "react-helmet";
import Api from "../Api";
import Contact from "../component/Contact";
import Loader from "../component/Loader";
import {useParams} from "react-router";

function About(props) {
    const [plus,setPLus] = useState(null)
    const [about,setAbout] = useState(null)
    const [loader, setLoader] = useState(true)
    const params = useParams()
    useEffect(() => {
        (async () => {
           try{
               const pluses = await Api.getPlusBlock(lang[params?.lang || 'en'] || 1)
               setPLus(pluses.data?.pluses[0].plus_translate[0])
               const aboutD = await Api.getAbout(lang[params?.lang || 'en'] || 1)
               setAbout(aboutD.data.about.home_translate[0])
               setLoader(false)
           }catch (e) {

           }
        })()
    }, [lang,params])


    if(loader){
        return <Loader />
    }else{
        return (
            <Wrapper>
                <Helmet>
                    <title>{menu[3].trans[lang[params?.lang || 'en'] || 1]}</title>
                </Helmet>
                <div className='main_container about'>
                    <h3>
                        {about?.title}
                    </h3>
                    <p dangerouslySetInnerHTML={{__html:about?.desc}}/>
                </div>
                {/*<div className="main_container images">*/}
                {/*    {image?.map(i => (*/}
                {/*        <figure key={i.title}>*/}
                {/*            <img src={REACT_APP_API_URL + i.image} alt=""/>*/}
                {/*            <figcaption>{i.title}</figcaption>*/}
                {/*        </figure>*/}
                {/*    ))}*/}
                {/*</div>*/}

                <div className="about_block main_container">
                    <div className="control_about " dangerouslySetInnerHTML={{__html:plus?.title}}/>
                    <Contact />

                </div>
            </Wrapper>
        );
    }
}

export default About;
