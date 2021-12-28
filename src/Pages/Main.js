import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import anon from "../components/img/anon.jpeg";
import axios from "axios";

const Main = () => {

    const nav = useNavigate()
    const [name, setName] = useState("")
    const [films,setFilms] = useState([])
    const [actorsNum, setActorsNum] = useState(10)


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setFilms(data.results))
    },[])


    const Search = e => {
        setName(e.target.value.trim())


    }

    const enter = (e) => {
        if (e.key === "Enter") {
            nav(`/search/${name}`)
        }
    }

    const onClick = () => {
        nav(`/search/${name}`)
    }
    return (
        <div className="container">
            <div className="h-75 bg-primary p-5 mb-5">
                <div className="text text-light fw-bold fs-2">Добро пожаловать</div>
                <div className="text text-light fw-bold fs-2 mb-5">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <input className="form-control search-input" placeholder="Введите название" onKeyDown={enter} onChange={Search} type="text"/>
                    <button onClick={onClick} className="btn btn-outline-secondary bg-light ">Найти</button>
                </div>
            </div>

            <p className=" text fw-bold fs-2 mb-3">Что популярно в кинотеатрах:</p>
            <div className="d-flex overflow-auto">

                {
                    films?.map(it => {
                        return (
                            <div key={it.id} className="h-25">
                                <div className="card h-100 p-3 m-2 d-flex flex-column justify-content-between  ">
                                    <Link className="text-decoration-none text-black" to={`/info/${it.id}`}>
                                        <img className="actor-img" src={it.poster_path? `https://image.tmdb.org/t/p/w300${it.poster_path}` : anon}
                                             alt={it.title}/>
                                        <h5> {it.title} </h5>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
        </div>
    );
};

export default Main;