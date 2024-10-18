import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../component/Wrapper";
import Api from "../Api";
import {useParams} from "react-router";
import {Helmet} from "react-helmet";
import {REACT_APP_API_URL} from '../config'
import {install, menuPrice,lang} from "../helpers/translate";
import img from '../assets/img/block/LogoHosted.svg'
import ClientBlock from "../component/ClientBlock";
import Solution from "../component/Solution";
import Stories from "../component/Stories";
import operators from '../assets/img/icon/operator.avif'
import Loader from "../component/Loader";
import {Link} from "react-router-dom";
import right from '../assets/img/icon/right.svg'
import Utils from "../helpers/Utils";

function Fax(props) {
    const [service, setService] = useState(null);
    const [services, setServices] = useState(null);
    const [feature, setFeature] = useState(null);
    const [operator, setOperator] = useState([])
    const [loader, setLoader] = useState(true)
    const [price, setPriceData] = useState([])

    const params = useParams()
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.getPartner(lang[params?.lang || 'en'] || 1)
                setOperator(data)
                const feat = await Api.getFeature(lang[params?.lang || 'en'] || 1)
                setFeature(feat.data.updatedServiceTranslate.home_translate[0])
                const serv = await Api.getService(lang[params?.lang || 'en'] || 1)
                setServices(serv?.data?.service)
                const price = await Api.price(lang[params?.lang || 'en'] || 1)
                setPriceData(price.data.price.map(m => ({...m, scount: 0, discounted: '0.00'})))
                setLoader(false)

            } catch (e) {

            }
        })()
    }, [lang,params])


    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.getServiceSingle(lang[params?.lang || 'en'] || 1, '/' + params.service);
                setService(data?.service);
                setSum(15000)
            } catch (e) {
                console.log(e)
            }

        })();
    }, [params.service,params.lang,lang]);
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
    const [sum, setSum] = useState(+menuPrice.all[lang[params?.lang || 'en'] || 1])
    const [start, setStart] = useState(0)
    const calculation = useCallback((id, fun) => {
        setPriceData((prevData) => {
            let count = 0;
            const updatedData = prevData.map((member) => {
                if (member.id === id) {
                    if (fun === '+') {
                        const newCount = member.scount + 1;
                        const discount = Utils.calculateDiscount(member.discount, newCount);
                        count += (newCount * +member['price_translate.price']);
                        return {
                            ...member,
                            scount: newCount,
                            cost: newCount * +member['price_translate.price'],
                            discounted: (newCount * +member['price_translate.price']) - (discount * +member['price_translate.price'])
                        };
                    } else if (fun === '-') {
                        const newCount = member.scount > 0 ? member.scount - 1 : 0;
                        const discount = Utils.calculateDiscount(member.discount, newCount);
                        count += (newCount * +member['price_translate.price']);
                        return {
                            ...member,
                            scount: newCount,
                            cost: newCount * +member['price_translate.price'],
                            discounted: (newCount * +member['price_translate.price']) - (discount * +member['price_translate.price'])
                        };
                    } else {
                        const discount = Utils.calculateDiscount(member.discount, fun);
                        count += (fun * +member['price_translate.price']);
                        return {
                            ...member,
                            scount: fun,
                            cost: fun * +member['price_translate.price'],
                            discounted: (fun * +member['price_translate.price']) - (discount * +member['price_translate.price'])
                        };
                    }
                } else {
                    count += +member.cost;
                }
                return member;
            });

            setStart(count);
            return updatedData;
        });
    }, []);


    useEffect(() => {
        if (start >= +menuPrice.all[lang[params?.lang || 'en'] || 1]) {
            setSum(start)
        } else {
            setSum(+menuPrice.all[lang[params?.lang || 'en'] || 1])
        }
    }, [start, menuPrice,lang,params.lang])
    if (loader) {
        return (
            <Loader/>
        );
    } else {
        return (
            <Wrapper>
                <Helmet>
                    <title>{service?.new_service_translate[0]?.title}</title>
                </Helmet>
                <div className="main_container about">
                    <div className="fax_header">
                        <h1>{service?.new_service_translate[0]?.title}</h1>
                        {(params.service === 'virtual' || params.service === 'local' || params.service === 'call-center')?<figure>
                            <img src={REACT_APP_API_URL + service?.icon} alt=""/>
                        </figure>:null}
                    </div>
                    <p dangerouslySetInnerHTML={{__html: service?.new_service_translate[0]?.desc}}/>
                </div>
                {(params.service === 'virtual' || params.service === 'local' || params.service === 'call-center')?<div className="main_container calc">
                    <div className="calculator">
                        <h3>{menuPrice.title[+lang[params?.lang || 'en'] || 1]}</h3>
                        <div className='price_block'>
                            <table className="price_table">
                                <thead>
                                <tr>
                                    <th>{menuPrice.service[+lang[params?.lang || 'en'] || 1]}</th>
                                    <th>{menuPrice.sprice[+lang[params?.lang || 'en'] || 1]}</th>
                                    <th>{menuPrice.count[+lang[params?.lang || 'en'] || 1]}</th>
                                    <th>{menuPrice.sum[+lang[params?.lang || 'en'] || 1]}</th>
                                </tr>
                                </thead>
                                <tbody>
                                { price ? price.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            {p['price_translate.title']}
                                        </td>
                                        <td>
                                            {+p['price_translate.price']} ({p.days})
                                        </td>
                                        <td>
                                            <div className="count_block">
                                            <span className="price_btn"
                                                  onClick={() => calculation(p.id, '-')}>
                                                <img
                                                    src={right}
                                                    alt=''/>
                                            </span>
                                                <input value={p.scount} type="number"
                                                       onChange={(ev) => calculation(p.id, +ev.target.value)}/>
                                                <span className="price_btn"
                                                      onClick={() => calculation(p.id, '+')}>
                                                <img
                                                    style={{transform: 'rotate(180deg)'}}
                                                    src={right}
                                                    alt=''/>
                                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="d-flex align-items-center justify-content-center flex-column">
                                                <span
                                                    className={parseInt(p.cost) > parseInt(p.discounted) ? 'text-decoration-line-through discounted' : ''}>{parseInt(p.cost) || 0} {menuPrice.money[+lang[params?.lang || 'en'] || 1]}</span>
                                                <span>{parseInt(p.discounted)} {menuPrice.money[+lang[params?.lang || 'en'] || 1]}</span>
                                            </span>
                                        </td>
                                    </tr>
                                )) : null}
                                </tbody>
                            </table>
                            <div className="p-num-prices--panel">
                                <h3>{menuPrice.allSum[+lang[params?.lang || 'en'] || 1]}</h3>
                                <div><h4>
                                    <b className={Utils.sumDiscount(price) >= 15000 ? 'text-decoration-line-through' : ''}>{sum} {menuPrice.money[+lang[params?.lang || 'en'] || 1]}</b> |
                                    <b> {Utils.sumDiscount(price) < 15000 ? '15000 ' + menuPrice.money[+lang[params?.lang || 'en'] || 1] : `${Utils.sumDiscount(price)} ${menuPrice.money[+lang[params?.lang || 'en'] || 1]}`} </b>
                                </h4>
                                    <Link to={windowWidth > 786?'#register':`/${Utils.lang()}/register`}
                                          className="signup--btn">{menuPrice.test[+lang[params?.lang || 'en'] || 1]}</Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>:null}
                <div style={params.service === 'local' && windowWidth <= 550 ? {background: '#0973BA'} : {}}
                     className="main_container services new-service">
                    {windowWidth <= 550 && params.service === 'local' ? <div className="services_install">
                        <div>
                            <div>
                                <h4>
                                    {install.title[+lang[params?.lang || 'en'] || 1]}
                                </h4>
                            </div>
                            <div className="content">
                                <p>
                                    {install.desc[+lang[params?.lang || 'en'] || 1]}
                                </p>
                            </div>
                        </div>

                        <figure>
                            <img src={img} alt=""/>
                        </figure>
                    </div> : null}
                    <div style={params.service !== 'virtual' && windowWidth <= 789 ? {width: '100%'} : {}}>
                        <div className="services_block"
                             style={params.service === 'local' && windowWidth <= 789 ? {width: '100%'} : {}}>
                            <h4>{feature?.title}</h4>
                            <p dangerouslySetInnerHTML={{__html: feature?.desc}}/>
                            <div className="carousel_banner_service">
                                {services?.map(el => (
                                    <div key={el.icon}>
                                        <img src={REACT_APP_API_URL + el.icon} alt=''/>
                                        <div className="text">
                                            <h4 style={{cursor:'pointer'}}>
                                                <Link style={{color:'black'}} to={`/single_service${el?.link}`}>{el.new_service_translate[0].title}</Link>
                                            </h4>
                                            <p>
                                                {el.new_service_translate[0].descShort}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {windowWidth <= 768 ?
                            <div className="services_second_block"><ClientBlock isHome={false}/></div> : null}

                    </div>
                    {windowWidth > 768 ? <div className="services_second_block">
                        { params.service === 'local'? <div className="services_install">
                            <div>
                                <div>
                                    <h3>
                                        {install.title[+lang[params?.lang || 'en'] || 1]}
                                    </h3>
                                </div>
                                <div className="content">
                                    <p>
                                        {install.desc[+lang[params?.lang || 'en'] || 1]}
                                    </p>
                                    {windowWidth > 1024 ? <figure>
                                        <img src={img} alt=""/>
                                    </figure> : null}
                                </div>
                            </div>
                            {windowWidth <= 1024 ?
                                <figure>
                                    <img src={img} alt=""/>
                                </figure> : null
                            }
                        </div>:null}
                        <ClientBlock isHome={false}/>
                        {windowWidth > 1024 ? <Solution/> : null}

                        {windowWidth <= 1024 ? params.service === 'virtual' ? <div className="carousel_banner">
                            <Stories/>
                        </div> : windowWidth <= 1024 ? <Solution/> : null : null}
                        {windowWidth > 1024 ? <div className="carousel_banner">
                            <Stories/>
                        </div> : null}
                    </div> : null}
                    {windowWidth <= 768 ? params.service === 'virtual' ? <div className="carousel_banner">
                        <div className="carousel_banner resized">
                            <Stories/>
                            <div className="main_container service_host_block">
                                <div className="justify-content-start">
                                    <h3>{operator?.partner?.home_translate[0]?.title}</h3>
                                    <p>{operator?.partner?.home_translate[0]?.desc}</p>

                                    <div className="align-items-center justify-content-center">
                                        <img src={operators} alt=''/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null : null}

                </div>
            </Wrapper>
        );
    }
}

export default Fax;
