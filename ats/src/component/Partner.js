import React, {useEffect, useState} from 'react';
import {REACT_APP_API_URL} from "../config";
import Api from "../Api";
import img from "../assets/img/block/LogoHosted.svg";
import operators from "../assets/img/icon/operator.avif";
import {useParams} from "react-router";
import {lang} from '../helpers/translate'
function Partner(props) {
    const params = useParams()
    const [operator, setOperator] = useState([])
    useEffect(() => {
        (async () => {
            const {data} = await Api.getPartner(lang[params?.lang || 'en'] || 1)
            setOperator(data)
        })()
    }, [params,lang])
    return (
        <div className="service_block">
            <h3>{operator?.partner?.home_translate[0]?.title}</h3>
            <p>{operator?.partner?.home_translate[0]?.desc}</p>

            {window.innerWidth > 992?<div className="d-flex flex-wrap">{operator?.partnerImages?.map(p => (
                <figure className="operator_image" key={p.path}>
                    <img src={REACT_APP_API_URL + p.path} alt=''/>
                </figure>
            ))}</div>
            : <figure className="m-0 d-flex align-items-center justify-content-center">
            <img src={operators} alt=''/>

        </figure>}
        </div>
    );
}

export default Partner;
