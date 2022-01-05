import React, { useState} from 'react';
import AllFilms from "./Pages/AllFilms";
import {Route, Routes, Navigate} from "react-router-dom"
import SearchMovie from "./components/Header/SearchMovie";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import Header from "./components/Header/Header";
import ActorInfo from "./components/ActorInfo/ActorInfo";
import Main from "./Pages/Main";
import AllPeople from "./Pages/AllPeople";
import Footer from "./components/Footer/Footer";


const App = () => {

    const [header, setHeader] = useState("header")


    const scroll = e => {
        if (e.deltaY > 0){
            setHeader("header header-hidden")
        } else {
            setHeader("header header-show")
        }
    }

    return (
        <div className="wraper " onWheel={scroll}>
        <div className={header}><Header/></div>
         <div className="flex-grow-1">
             <Routes>
                 <Route path="/" element={<Main/>}/>
                 <Route path="/films" element={<AllFilms/>}/>
                 <Route path="/people" element={<AllPeople/>}/>
                 <Route path="/search/:name" element={<SearchMovie/>}/>
                 <Route path="/info/:id" element={<MovieInfo/>}/>
                 <Route path="/actor/:id" element={<ActorInfo/>}/>
                 <Route path="*" element={<Navigate to="/"/>}/>

             </Routes>
         </div>

            <Footer/>
        </div>
    );
};

export default App;