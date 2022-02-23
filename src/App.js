import React from 'react';
import AllFilms from "./Pages/AllFilms";
import {Route, Routes, Navigate} from "react-router-dom"
import SearchMovie from "./components/Header/SearchMovie";
import MovieInfo from "./Pages/MovieInfo/MovieInfo";
import Header from "./components/Header/Header";
import ActorInfo from "./Pages/ActorInfo/ActorInfo";
import Main from "./Pages/Main";
import AllPeople from "./Pages/AllPeople";
import Footer from "./components/Footer/Footer";
import SerialsInfo from "./Pages/SerialsInfo/SerialsInfo";
import AllSerials from "./Pages/AllSerials";
import LanguageProvider from "./languageCotext/LanguageContext";


const App = () => {



    return (
        <LanguageProvider>
            <div className="wraper ">
                <Header/>
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/films" element={<AllFilms/>}/>
                        <Route path="/people" element={<AllPeople/>}/>
                        <Route path="/serials" element={<AllSerials/>}/>
                        <Route path="/search/:name" element={<SearchMovie/>}/>
                        <Route path="/info/:id" element={<MovieInfo/>}/>
                        <Route path="/serial/:id" element={<SerialsInfo/>}/>
                        <Route path="/actor/:id" element={<ActorInfo/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>

                    </Routes>
                </div>

                <Footer/>
            </div>
        </LanguageProvider>
    );
};

export default App;