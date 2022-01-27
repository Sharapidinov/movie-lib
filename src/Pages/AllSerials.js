import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import Spinner from "../components/Spinner/Spinner";
import Pagination from "../components/pagination/Pagination";
import {useNavigate, useSearchParams} from "react-router-dom";
import SerialCard from "../components/SerialCard/SerialCard";

const AllSerials = () => {
    const [spinner, setSpinner] = useState(true)
    const [serials, setSerials] = useState([])
    const [query, setQuery] = useSearchParams()
    const [page, setPage] = useState(+query.get("page"))
    const [name, setName] = useState("")
    const nav = useNavigate()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/tv?api_key=073e2098c1a48c1fee6edef88aedd5b7&page=${page}&language=ru`)
            .then(({data}) => {
                setSerials(data.results)
                setSpinner(false)
            })
    }, [page])




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
                <input className="form-control search-input" placeholder="Введите название фильма или сериала" onKeyDown={enter}
                       onChange={Search} type="text"/>
                <button onClick={onClick} className="btn btn-outline-secondary ">Найти</button>
            </div>

            <Pagination page={page} setQuery={setQuery} setPage={setPage}/>

            <div className="row m-auto align-items-center justify-content-center pt-5">
                {
                    serials.map(it => {
                        return (

                            <SerialCard key={it.id} it={it}/>

                        )
                    })
                }
            </div>
            <Pagination page={page} setPage={setPage}/>
        </div>
    )

};

export default AllSerials;