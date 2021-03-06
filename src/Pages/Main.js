import React, {useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import anon from "../components/img/anon.jpeg";
import axios from "axios";
import Slider from "react-slick"
import {LanguageContext} from "../languageCotext/LanguageContext.js";

const Main = () => {

    const nav = useNavigate()
    const [name, setName] = useState("")
    const [films,setFilms] = useState([])
    const [serials,setSerials] = useState([])
    const [dis, setDis] = useState(true)
    const [coords, setCoords] = useState(0)
    const {language} = useContext(LanguageContext)

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
        axios(`https://api.themoviedb.org/3/movie/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setFilms(data.results))
        axios(`https://api.themoviedb.org/3/tv/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setSerials(data.results))
    },[language])


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
    const goToSerial =  (id, e) =>{
        if(Math.abs(e.clientX - coords) < 5)
            nav(`/serial/${id}`)
    }

    return (
        <div className="container pad pb-4">
            <div className="mt-3 h-75 bg-primary p-5 mb-5">
                <div className="text text-light fw-bold fs-2">{(language === "ru-RU")? "?????????? ????????????????????": "Welcome"}</div>
                <div className="text text-light fw-bold fs-2 mb-5">{(language === "ru-RU")
                    ?"???????????????? ??????????????, ???????????????? ?? ??????????. ???????????????????? ????????????."
                    : "Millions of movies, series and people. Explore now."

                }
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <input className="form-control search-input" placeholder={(language === "ru-RU") ?"?????????????? ????????????????" : "Enter the title"} onKeyDown={enter} onChange={Search} type="text"/>
                    <button onClick={onClick}  disabled={dis} className="btn btn-outline-secondary bg-light ">{(language === "ru-RU")? "??????????" : "Find"}</button>
                </div>
            </div>

            <p className=" text fw-bold fs-2 mb-3">{(language === "ru-RU")?"?????? ?????????????????? ?? ??????????????????????:" : "What is popular in cinemas:"}</p>

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


            <p className=" text fw-bold fs-2 mb-3">{(language === "ru-RU") ? "???????????????????? ??????????????:" : "Popular TV shows:"}</p>

            <Slider {...settings}>
                {
                    serials?.map(it => {
                        return (
                            <div key={it.id} className="h-100">
                                <div className="card h-100 p-3 m-2 d-flex flex-column justify-content-between  ">
                                    <button onMouseDown={(e) => setCoords(e.clientX)} onClick={(e) => goToSerial(it.id, e)} className="text-decoration-none button-slider text-black">
                                        <img className="actor-img" src={it.poster_path? `https://image.tmdb.org/t/p/w300${it.poster_path}` : anon}
                                             alt={it.name}/>
                                        <h5> {it.name} </h5>
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