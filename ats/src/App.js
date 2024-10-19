import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Scroll from "./component/Scroll";
import Home from "./page/Home";
import Fax from "./page/Fax";
import About from "./page/About";
import Developers from "./page/Developers";
import Integration from "./page/Integration";
// import Partners from "./page/Partners";
import Register from "./page/Register";
import Confirm from "./page/Confirm";
// import DropPass from "./page/DropPass";
import NotFound from "./page/NotFound";


function App() {

    useEffect(( ) => {
        if(+localStorage.getItem('ipatsLang') !== 1){
            document.getElementById('root').classList.add('arm')
        }else{
            document.getElementById('root').classList.add('eng')
        }
    }, [])
    return (
        <>
            <BrowserRouter basename="/">
                <Scroll/>
                <Routes>
                    <Route path="/:lang/" element={<Home/>}/>
                    <Route path="/" element={<Navigate to='/en'/>}/>
                    <Route path="/:lang/home"  element={<Navigate to='/:lang'/>} />
                    <Route path="/home"  element={<Navigate to='/:lang'/>} />
                    <Route path="/:lang/about" element={<About/>}/>
                    {/*<Route path="/:lang/login" element={<Login/>}/>*/}
                    <Route path="/:lang/register" element={<Register/>}/>
                    <Route path="/:lang/crm" element={<Integration/>}/>
                    <Route path="/:lang/single_service/:service" element={<Fax/>}/>
                    <Route path="/:lang/api_document" element={<Developers/>}/>
                    {/*<Route path="/:lang/partner" element={<Partners/>}/>*/}
                    <Route path="/:lang/registered" element={<Confirm/>}/>
                    <Route path="/not-found" element={<NotFound/>}/>
                    <Route path="/*" element={<NotFound/>}/>

                </Routes>
            </BrowserRouter>
            <ToastContainer closeOnClick hideProgressBar/>
        </>
    );
}

export default App;
