import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";
import {useNavigate, useSearchParams} from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import Pagination from "../components/pagination/Pagination";
import {LanguageContext} from "../languageCotext/LanguageContext.js";

function AllFilms() {
    const [query, setQuery] = useSearchParams()
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState(+query.get("page"))
    const [name, setName] = useState("")
    const [spinner, setSpinner] = useState(true)
    const {language} = useContext(LanguageContext)

    const nav = useNavigate()


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?api_key=073e2098c1a48c1fee6edef88aedd5b7&page=${page}&language=${language}`)
            .then(({data}) => {
                setMovie(data.results)
                setSpinner(false)
            })
    }, [page, language])


    const Search = e => {
        if (e.target.value.trim() !== ``) {
            setName(e.target.value.trim())
        }


    }

    const enter = (e) => {
        if (e.target.value.trim() !== ``) {
            setName(e.target.value.trim())
            if (e.key === "Enter") {
                nav(`/search/${name}`)
            }
        }

    }

    const onClick = () => {
        nav(`/search/${name}`)
    }

    if (spinner) return <Spinner/>

    return (
        <div className="container container-sm container-md container-lg container-xl pad">

            <div className="mt-3 d-flex justify-content-around align-items-center">
                <input className="form-control search-input" placeholder={(language === "ru-RU")?"Введите название фильма или сериала" :"Enter the name of the movie or series"} onKeyDown={enter}
                       onChange={Search} type="text"/>
                <button onClick={onClick} className="btn btn-outline-secondary ">{(language === "ru-RU")?"Найти":"Find"}</button>
            </div>

           <Pagination page={page} setQuery={setQuery} setPage={setPage}/>

            <div className="row m-auto align-items-center justify-content-center pt-5">
                {
                    movie.map(it => {
                        return (

                            <MovieCard language={language} key={it.id} it={it}/>

                        )
                    })
                }
            </div>
            <Pagination page={page} setPage={setPage}/>
        </div>
    )
}

export default AllFilms;
