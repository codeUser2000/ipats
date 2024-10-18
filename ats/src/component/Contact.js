import React, {useCallback, useEffect, useRef, useState} from 'react';
import img from '../assets/img/block/CallCenterLogo.svg'
import Api from "../Api";
import {buttons, contactUs, input,lang} from "../helpers/translate";
import {toast} from "react-toastify";
import {useParams} from "react-router";
function Contact(props) {
    const [contact, setContact] = useState({})
    const params = useParams()
    const [message, setMessage] = useState({
        name:'',
        company:'',
        email:'',
        contact_number:'',
        message:'',
    })
    const handleChange = useCallback((name, ev) => {
        setMessage((prev) => ({
            ...prev,
            [name]: ev.target.value
        }))
    }, [])
    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault()
        try {
            if(!message.name || !message.message || !message.company || !message.email || !message.contact_number){
                toast.error('Fill all the inputs')
                return
            }
            await Api.contact_us(message)
        }catch (e) {

        }
    }, [message])
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Api.get_contact(lang[params?.lang || 'en'] || 1)
                setContact(data.contact.home_translate[0])
            }catch (e) {

            }
        })()
    }, [lang,params])
    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash !== '#form') {
            setMessage((prev) => ({
                ...prev,
                web: hash.split('#')[1].toUpperCase()
            }))
        }

    }, [])
    const scrollToElementRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (scrollToElementRef.current && location.hash) {
                scrollToElementRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }, 500)
    }, [location.hash]);
    return (
        <div className="connect">
            <div>
                <h3>
                    {!window.location.pathname.includes('/about')?contact?.title:contactUs.title[lang[params?.lang || 'en'] || 1]}

                </h3>
                {!window.location.pathname.includes('/api_document') ?<img src={img} alt=''/>:null}

            </div>
            {window.location.pathname.includes('/about')?contactUs.desc[lang[params?.lang || 'en'] || 1]:<div dangerouslySetInnerHTML={{__html:contact?.desc}} ref={scrollToElementRef} style={{ scrollMarginTop: 40}}/>}
            <form  onSubmit={handleSubmit}>
                <input value={message.name} placeholder={input.name[lang[params?.lang || 'en'] || 1]} onChange={(ev) => handleChange('name',ev)}/>
                <input value={message.company} placeholder={input.company[lang[params?.lang || 'en'] || 1]} onChange={(ev) => handleChange('company',ev)}/>
                <input value={message.email} placeholder={input.email[lang[params?.lang || 'en'] || 1]} onChange={(ev) => handleChange('email',ev)}/>
                <input value={message.contact_number} placeholder={input.phone[lang[params?.lang || 'en'] || 1]} onChange={(ev) => handleChange('contact_number',ev)}/>
                <textarea rows={3} value={message.message} placeholder={input.message[lang[params?.lang || 'en'] || 1]} onChange={(ev) => handleChange('message',ev)}/>
                <button>
                    {!window.location.pathname.includes('/about')?buttons.request[lang[params?.lang || 'en'] || 1]:contactUs.btn[lang[params?.lang || 'en'] || 1]}
                </button>
            </form>
        </div>
    );
}

export default Contact;
