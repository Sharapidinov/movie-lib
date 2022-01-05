import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import anon from "../components/img/anon.jpeg";
import axios from "axios";
import Slider from "react-slick"

const Main = () => {

    const nav = useNavigate()
    const [name, setName] = useState("")
    const [films,setFilms] = useState([])
    const [dis, setDis] = useState(true)
    const [coords, setCoords] = useState(0)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 590,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setFilms(data.results))
    },[])


    const Search = e => {
        if (e.target.value.trim() !== ``){
            setName(e.target.value.trim())
            setDis(false)
        }


    }

    const enter = (e) => {
        if (e.target.value.trim() !== ``){
            setName(e.target.value.trim())
            if (e.key === "Enter") {
                nav(`/search/${name}`)
            }
        }

    }

    const onClick = () => {
        nav(`/search/${name}`)
    }
    const goToInfo = (id, e) =>{
        if(Math.abs(e.clientX - coords) < 5)
            nav(`/info/${id}`)

    }

    return (
        <div className="container pad pb-4">
            <div className="h-75 bg-primary p-5 mb-5">
                <div className="text text-light fw-bold fs-2">Добро пожаловать</div>
                <div className="text text-light fw-bold fs-2 mb-5">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <input className="form-control search-input" placeholder="Введите название" onKeyDown={enter} onChange={Search} type="text"/>
                    <button onClick={onClick}  disabled={dis} className="btn btn-outline-secondary bg-light ">Найти</button>
                </div>
            </div>

            <p className=" text fw-bold fs-2 mb-3">Что популярно в кинотеатрах:</p>

                <Slider {...settings}>
                    {
                        films?.map(it => {
                            return (
                                <div key={it.id} className="h-100">
                                    <div className="card h-100 p-3 m-2 d-flex flex-column justify-content-between  ">
                                        <button onMouseDown={(e) => setCoords(e.clientX)} onClick={(e) => goToInfo(it.id, e)} className="text-decoration-none button-slider text-black">
                                            <img className="actor-img" src={it.poster_path? `https://image.tmdb.org/t/p/w300${it.poster_path}` : anon}
                                                 alt={it.title}/>
                                            <h5> {it.title} </h5>
                                        </button>
                                    </div>
                                </div>
                            )
                        })


                    }
                </Slider>

        </div>
    );
};

export default Main;