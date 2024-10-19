import axios from 'axios';
import {REACT_APP_API_URL} from './config'
const api = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: REACT_APP_API_URL,
    'Access-Control-Allow-Origin':REACT_APP_API_URL
});


class Api {


    static register(form) {
        return api.post(`/member/register`,form)
    }
    static getMember(lang) {
        return api.get(`/member/get?lang=${lang || '1'}`)
    }
    static getVideo(lang) {
        return api.get(`/home/getVideo?lang=${lang || '1'}`)
    }
    static getFeature(lang) {
        return api.get(`/home/getService?lang=${lang || '1'}`)
    }
    static getHome(lang) {
        return api.get(`/home/getHome?lang=${lang || '1'}`)
    }

    static getNewService(lang) {
        return api.get(`/service/get?lang=${lang || ''}`)
    }
    static price(lang) {
        return api.get(`/price/get?lang=${lang || ''}`)
    }
    static get_for_pbx(lang,parent) {
        return api.get(`/service/get_for_pbx?lang=${lang || ''}&parent_id=${parent || ''}`)
    }

    static getNewSlide(lang) {
        return api.get(`/slide/get?lang=${lang || ''}`)
    }
    static getNewSlideResult(lang) {
        return api.get(`/slide/result?lang=${lang || ''}`)
    }


    //-------HOME--------//


    static get(lang) {
        return api.get(`/home/get?lang=${lang || '1'}`)
    }
    static get_contact(lang) {
        return api.get(`/home/get_contact?lang=${lang || '1'}`)
    }

    static getService(lang) {
        return api.get(`/service/get?lang=${lang || '1'}`)
    }
    static getServiceSingle(lang,link) {
        return api.get(`/service/get_single?lang=${lang || '1'}&link=${link || ''}`)
    }

    static getServiceLast(lang) {
        return api.get(`/service/get_last?lang=${lang || '1'}`)
    }

    static client(lang) {
        return api.get(`/home/client?lang=${lang || '1'}`)
    }

    static getApp(){
        return api.get(`/home/app_get`)
    }
    static getAbout(lang){
        return api.get(`/home/get_about?lang=${lang || ''}`)
    }

    static getCount(lang) {
        return api.get(`/home/counter_get?lang=${lang || ''}`)
    }

    static getSoc() {
        return api.get(`/partner/get_soc`)
    }

    static getPrev(lang) {
        return api.get(`/service/get_preview?lang=${lang || ''}`)
    }
    static getPrevLocal(lang) {
        return api.get(`/service/get_preview_local?lang=${lang || ''}`)
    }

    static getLocal(lang) {
        return api.get(`/service/get_local?lang=${lang || ''}`)
    }


    //--------WHO AND HOW -------//

    static contact_us(form) {
        return api.post(`/home/contact_us`, form)
    }
    static getApi(lang) {
        return api.get(`/api/get?lang=${lang || ''}`)
    }
    static getDev(lang) {
        return api.get(`/api/getDev?lang=${lang || ''}`)
    }
    static menu(lang) {
        return api.get(`/menu?lang=${lang}`)
    }
    static getMenu(lang,link) {
        return api.get(`/menu_single?lang=${lang}&link=${link}`)
    }
    static get_array(lang,link) {
        return api.get(`/service/get_array?lang=${lang}&link=${encodeURIComponent(JSON.stringify(link))}`)
    }
    static getApiSingle(id,lang) {
        return api.get(`/api/get_single?lang=${lang || ''}&id=${id || ''}`)
    }
    static getCrm(lang) {
        return api.get(`/home/crm?lang=${lang || ''}`)
    }
    static getCrmIntage(lang) {
        return api.get(`/api/crm_integration?lang=${lang || ''}`)
    }
    static getCrmIntagSingle(id,lang) {
        return api.get(`/api/get_single_crm_integration?id=${id || ''}&lang=${lang || ''}`)
    }

    static getQuest(lang){
        return api.get(`/question/get?lang=${lang || ''}`)
    }

    static getPartner(lang) {
        return api.get(`/home/partner?lang=${lang || 1}`);
    }
    static getPartnerBlock(lang) {
        return api.get(`/partner/get?lang=${lang || 1}`);
    }
    static getPlusBlock(lang) {
        return api.get(`/pluses/get?lang=${lang || 1}`);
    }
    static getNeedBlock(lang) {
        return api.get(`/needs/get?lang=${lang || 1}`);
    }
    static getImages() {
        return api.get(`/home/about_img`,)
    }
    static getPartnerShip(lang) {
        return api.get(`/partner/get_partnership?lang=${lang || 1}`);
    }
    static getPartnerIntegration(lang) {
        return api.get(`/partner/get_partner_integration?lang=${lang || 1}`);
    }
}

export default Api;
