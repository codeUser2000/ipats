import React, {useEffect, useState} from 'react';
import Wrapper from "../component/Wrapper";
import {Helmet} from "react-helmet";
import {homeD, install, menu, lang} from "../helpers/translate";
import Contact from "../component/Contact";
import Api from "../Api";
import Utils from "../helpers/Utils";
import Product from "../component/Product";
import postman from '../assets/img/icon/PostmanIcon.svg'
import _ from 'lodash'
import dev from '../assets/img/icon/dev.svg'
import swagger from '../assets/img/icon/SwaggerIcon.svg'
import Loader from "../component/Loader";
import {useParams} from "react-router";

function Developers(props) {
    const [api, setApi] = useState([])
    const [params, setParams] = useState([])
    const [loader, setLoader] = useState(true)
    const param = useParams()
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.getApi(lang[param?.lang || 'en'] || 1)
                setApi(data.api)
                let arr = data.api.map(s => Utils.sortParams(s.api_doc_translate))
                setParams(arr)
                setLoader(false)
            } catch (e) {
                console.log(e)
            }

        })()
    }, [param,lang])

    const handleClick = (event) => {
        const href = event.currentTarget.getAttribute('href');
        if (href === "https://ip-ats.com/ATS-API.postman_collection.json") {
            event.preventDefault();
            fetch(href)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'ATS-API.postman_collection.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Download failed:', error));
        }
    };
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
  if(loader){
      return (
         <Loader/>
      );
  }else{
      return (
          <Wrapper>
              <Helmet>
                  <title>
                      {menu[4].trans[lang[params?.lang || 'en'] || 1]}
                  </title>
              </Helmet>
              <div className="main_container">
                  <h3 className="d-flex align-items-center justify-content-between">
                      {homeD.api_title[lang[params?.lang || 'en'] || 1]}
                      <a href="https://ip-ats.com/api-docs" target="_blank"> <img style={{width: 30, height: 30}} src={dev} alt="Go to API document"/></a>
                  </h3>
                  <hr/>
              </div>
              <div className="developer main_container">

                  <div className="api_part">
                      {windowWidth <= 768 ? <div className="connect dev">
                              <p>
                                  {install.swagger[lang[params?.lang || 'en'] || 1]}
                              </p>
                              <a style={{marginBottom:15}} href="https://ip-ats.com/api-docs">
                                  <img style={{marginRight:5}} src={swagger} alt="Go to API document"/>
                                  {install.swaggerL[lang[params?.lang || 'en'] || 1]}

                              </a>
                              <p>
                                  {install.postman[lang[params?.lang || 'en'] || 1]}
                              </p>
                              <a href="https://ip-ats.com/ATS-API.postman_collection.json" onClick={handleClick}>
                                  <img style={{marginRight:5}} src={postman} alt="Go to API document"/>
                                  {install.postmanL[lang[params?.lang || 'en'] || 1]}

                              </a>
                          </div>
                          : null}
                      <p>
                          {homeD.api_desc[lang[params?.lang || 'en'] || 1]}

                      </p>
                      <div className='api_block'>
                          {api.map((a, i) => (
                              <div key={_.uniqueId()}>
                                  <div className="api_header">
                                    <span>
                                    {a.type}
                                </span>
                                      <h3>
                                          {a.api_title_translate[0].title}
                                      </h3>
                                  </div>
                                  <p className="api_block_p">{a.api_title_translate[0].desc}</p>

                                  <p className="api_block_p">{homeD.example[lang[params?.lang || 'en'] || 1]}: {a.link?.replaceAll('ats.am','ip-ats.com')}?key=185f8db32271fe25f561a</p>

                                  <p className="request_type">
                                      {params[i][0].length ? 'Body' : ''}
                                  </p>
                                  {params[i][0].length ? params[i][0].map(p => (
                                      <div key={_.uniqueId()}>
                                          <p><b>{p.param}</b> : <b>{p.dataType}</b></p>
                                          <p className="api_block_p">{p.desc}</p>

                                      </div>
                                  )) : null}
                                  <p className="request_type">
                                      {params[i][1].length ? 'Query' : ''}
                                  </p>
                                  {params[i][1].length ? params[i][1].map(p => (
                                      <div key={_.uniqueId()}>
                                          <p><b>{p.param}</b> : <b>{p.dataType}</b></p>
                                          <p className="api_block_p">{p.desc}</p>

                                      </div>
                                  )) : null}


                                  <div>
                                      <b>Response</b>
                                      <pre className="autorization">
                                        {a?.res}
                                    </pre>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                  {windowWidth > 435 ? <div>
                      {windowWidth > 768 ?
                          <div className="connect">
                              <p>
                                  {install.swagger[lang[params?.lang || 'en'] || 1]}
                              </p>
                              <a style={{marginBottom:15}}  href="https://ip-ats.com/api-docs" target="_blank">
                                  <img src={swagger} style={{marginRight:5}} alt="Go to API document"/>
                                  {install.swaggerL[lang[params?.lang || 'en'] || 1]}

                              </a>
                              <p>
                                  {install.postman[lang[params?.lang || 'en'] || 1]}
                              </p>
                              <a href="https://ip-ats.com/Ip-ats.com-API.postman_collection.json" onClick={handleClick}>
                                  <img src={postman} style={{marginRight:5}} alt="Go to API document"/>
                                  {install.postmanL[localStorage.getItem('ipatsLang') || 1]}

                              </a>
                          </div> : null}
                      {windowWidth > 1024 ? <>
                          <div className="about_block">
                              <Product/>
                          </div>
                          <Contact/>
                      </> : <>
                          <Contact/>
                          <div className="about_block">
                              <Product/>
                          </div>
                      </>}
                  </div> : null}
              </div>
          </Wrapper>
      );
  }
}

export default Developers;
