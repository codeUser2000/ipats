const isHTTPS = window.location.protocol === "https:";

export const REACT_APP_API_URL = isHTTPS
    ? 'https://ats.am'
    : 'http://10.227.0.86:4003';
