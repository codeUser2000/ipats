import React, {useEffect, useState} from 'react';
import Api from "../Api";
import {useParams} from "react-router";
import {lang} from '../helpers/translate'
function Product(props) {
    const params = useParams()
    const [plus,setPLus] = useState(null)
    useEffect(() => {
        (async () => {
            try{
                const {data} = await Api.getPlusBlock(lang[params?.lang || 'en'] || 1)
                setPLus(data?.pluses[0].plus_translate[0])
            }catch (e) {

            }
        })()
    }, [params,lang])
    return (
        <div className="control_about " dangerouslySetInnerHTML={{__html:plus?.title?.replaceAll('ATS.AM','Ip-ats.com')}}/>

    );
}

export default Product;
