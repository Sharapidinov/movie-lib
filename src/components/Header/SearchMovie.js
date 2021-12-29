import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

const SearchMovie = () => {
    const [search, setSearch] = useState([])

    const {name} = useParams()

    const nav = useNavigate()



    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie?api_key=073e2098c1a48c1fee6edef88aedd5b7&query=${name}`)
            .then(({data}) => setSearch(data.results))
    },[name])



    return (
        <div className="container pt-5">

            <button className="btn btn-outline-secondary" onClick={() => nav(`/`)}> На главную </button>

            <div className="row pt-5">

                {

                    search?.map( it => {
                        return <MovieCard key={it.id} it={it}/>
                    })

                }

            </div>


        </div>
    );
};

export default SearchMovie;