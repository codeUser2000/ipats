import React, {useEffect, useState} from 'react';
import Wrapper from "../component/Wrapper";
import {REACT_APP_API_URL} from '../config'
import {Helmet} from "react-helmet";
import {menu,lang} from "../helpers/translate";
import Api from "../Api";
import Partner from "../component/Partner";
import Product from "../component/Product";
import Contact from "../component/Contact";
import Loader from "../component/Loader";
import {useParams} from "react-router";
function Partners(props) {
    const [partners,setPartners] = useState(null)
    const [integrator,setIntegrator] = useState(null)
    const [integration,setIntegration] = useState(null)
    const [loader, setLoader] = useState(true)
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
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.getPartnerShip(lang[params?.lang || 'en'] || 1)
                setPartners(data.partnerImages.home_translate[0])
                const integrate = await Api.getPartnerIntegration(lang[params?.lang || 'en'] || 1)
                setIntegration(integrate.data.integration.home_translate[0])
                const partner = await Api.getPartnerBlock(lang[params?.lang || 'en'] || 1)
                setIntegrator(partner.data.partnerImages)
                setLoader(false)
            }catch (e) {
            }
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
                   <title>{menu[0].trans[lang[params?.lang || 'en'] || 1]}</title>
               </Helmet>
               <div className="main_container partnership">
                   <h3>{partners?.title}</h3>
                   <hr/>
                   <div className="partnership_block" dangerouslySetInnerHTML={{__html:partners?.desc}}/>
               </div>
               <div className=" integration">
                   {windowWidth < 768?<div>
                       <Partner/>
                   </div>:null}
               </div>

               <div className="main_container integration">
                   <div>
                       <h3>{integration?.title}</h3>
                       <p>{integration?.desc}</p>
                       <div>
                           {integrator?.map(c => (
                               <div className="crm_item" key={c.id}>
                                   <figure><img src={REACT_APP_API_URL + c.image} alt=""/></figure>
                                   <div>
                                       <h3>{c.partner_data_translate[0].title}</h3>
                                       <p>{c.partner_data_translate[0].desc}</p>
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

export default Partners;
