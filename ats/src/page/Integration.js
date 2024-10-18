import React, {useEffect, useState} from 'react';
import Wrapper from "../component/Wrapper";
import Product from "../component/Product";
import Contact from "../component/Contact";
import Partner from "../component/Partner";
import Api from "../Api";
import {homeD, lang, menu} from "../helpers/translate";
import {REACT_APP_API_URL} from '../config'
import {Helmet} from "react-helmet";
import Loader from "../component/Loader";
import {useParams} from "react-router";

function Integration(props) {
    const [operator, setOperator] = useState({})
    const [crm, setCrm] = useState([])
    const params = useParams()
    const [loader, setLoader] = useState(true)
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
    useEffect(() => {
        (async () => {
            const {data} = await Api.getCrm(lang[params?.lang || 'en']|| 1)
            setOperator(data.crm.home_translate[0])
            const integrate = await Api.getCrmIntage(lang[params?.lang || 'en'] || 1)
            setCrm(integrate.data.crm)
            setLoader(false)

        })()
    }, [params,lang])

   if(loader){
       return (
          <Loader/>
       );
   }else{
       return (
           <Wrapper>
               <Helmet>
                   <title>
                       {menu[2].trans[lang[params?.lang || 'en'] || 1]}
                   </title>
               </Helmet>

               <div className="main_container about">
                   <h1>{operator?.title}</h1>
                   <p dangerouslySetInnerHTML={{__html:operator?.desc}}/>
               </div>
               <div className="main_container crm">
                   <div>

                       <div className="crm_block my_crm">
                           <h3>
                               {homeD.crm[lang[params?.lang || 'en'] || 1]}
                           </h3>
                           {crm.map(c => (
                               <div className="crm_item" key={c.id}>
                                   <figure><img src={REACT_APP_API_URL + c.image} alt=""/></figure>
                                   <div>
                                       <h3>{c.crm_integration_translate[0].title}</h3>
                                       <p>{c.crm_integration_translate[0].desc}</p>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
                   {windowWidth > 768?<div>
                       <Partner/>
                       {windowWidth > 1024?<>
                           <div className="about_block">
                               <Product/>
                           </div>
                           <Contact/>
                       </>:<>
                           <Contact/>
                           <div className="about_block">
                               <Product/>
                           </div>
                       </>}
                   </div>:null}
               </div>
           </Wrapper>
       );
   }
}

export default Integration;
