import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import {LanguageContext} from "../../languageCotext/LanguageContext.js";

const SearchMovie = () => {
    const [search, setSearch] = useState([])
    const {language} = useContext(LanguageContext)
    const {name} = useParams()

    const nav = useNavigate()



    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie?api_key=073e2098c1a48c1fee6edef88aedd5b7&query=${name}`)
            .then(({data}) => setSearch(data.results))
    },[name])



    return (
        <div className="container pad">

            <button className="btn mt-3 btn-outline-secondary" onClick={() => nav(`/`)}> {(language === "ru-RU")?"На главную" : "To the main"} </button>

            <div className="row pt-5">

                {
                    (search.length !== 0)?
                    search?.map( it => {
                        return <MovieCard key={it.id} it={it}/>
                    }): (language === "ru-RU")?"Ненайдено" : "Not found"

                }

            </div>


        </div>
    );
};

export default SearchMovie;