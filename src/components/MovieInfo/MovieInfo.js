import React, {useEffect, useState} from 'react';
import {useParams,  useNavigate} from "react-router-dom";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import axios from "axios";
import anon from "../img/anon.jpeg"
import Slider from "react-slick"
import 'react-circular-progressbar/dist/styles.css';
import Triller from "./Triller";


const MovieInfo = () => {

    const [info, setInfo] = useState({})
    const [actors, setActors] = useState([])
    const [crew, setCrew] = useState([])
    const [videos, setVideos] = useState([])
    const [videosKey, setVideosKey] = useState("")
    const [actorsNum, setActorsNum] = useState(10)
    const [toggle, setToggle] = useState(false)
    const [coords, setCoords] = useState(0)

    const params = useParams()

    const nav = useNavigate()

    const settings = {
        dots: false,
        infinite: false,
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
        axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setInfo(data))

        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => {
                setActors(data.cast)
                setCrew(data.crew.filter(it => it.job === `Director` || it.job === `Screenplay`))
            })

        axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setVideos(data.results))
    }, [params])


    const par = (key) => {
        console.log(key)
        setVideosKey(key)
        setToggle(true)
    }

    const goToInfo = (id, e) =>{
        if(Math.abs(e.clientX - coords) < 5)
        nav(`/actor/${id}`)

    }

    return (
        <div key={info.id} className="pad">


            <section style={{
                background: `#473a41 url(https://image.tmdb.org/t/p/original${info.belongs_to_collection?.backdrop_path || info.backdrop_path}) center/cover`,
                backgroundBlendMode: ` overlay `
            }} className="card p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <img src={`https://image.tmdb.org/t/p/w400${info.poster_path}`} alt=""/>
                        </div>
                        <div className="col-8 text-light p-3">
                            <h1 className="card-title text-light">{info.title}</h1>
                            <div>( {info.release_date} )</div>
                            <div className="d-flex mb-3 text-light ">
                                &bull;
                                &ensp;
                                {info.genres?.map(it => <div className="text-light me-3">  {it.name}</div>)}
                                &bull;
                            </div>
                            <div className="text-light mb-3"> Длительность {info.runtime} минут</div>
                            <div className="d-flex align-items-center mb-5">
                                <div className="rating me-2">
                                    <CircularProgressbar
                                        value={info.vote_average * 10}
                                        text={`${info.vote_average * 10}%`}
                                        styles={buildStyles({
                                            textSize: '22px',
                                            pathTransitionDuration: 2.5,
                                            textColor: '#FFFFFF',
                                            trailColor: '#FFFFFF',
                                            backgroundColor: '#FFFFFF',
                                            background: {
                                                fill: '#FFFFFF',
                                            },
                                            pathColor: "#0fb6de"
                                        })}
                                    />
                                </div>
                                <div>Пользовательский счёт</div>
                            </div>

                            <p className="card-subtitle text-light">{info.overview}</p>

                            <div className="text d-flex">
                                {
                                    crew.map(it => {
                                        return (
                                            <div className="m-3">
                                                <h4>{it.name}</h4>
                                                <p>{it.job}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="card h-100 p-5">

                <Slider {...settings}>
                    {
                        actors?.slice(0, actorsNum)?.map(it => {
                            return (
                                <div key={it.id} className="h-100">
                                    <div className="card h-100 p-3 m-2 d-flex flex-column justify-content-between  ">
                                        <button onMouseDown={(e) => setCoords(e.clientX)} onClick={(e) => goToInfo(it.id, e)} className="text-decoration-none button-slider text-black" >
                                            <img className="actor-img"
                                                 src={it.profile_path ? `https://image.tmdb.org/t/p/w300${it.profile_path}` : anon}
                                                 alt={it.name}/>
                                            <h5> {it.name} </h5>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {actorsNum < actors.length && <div className="d-flex align-items-center text-center">
                        <button className="btn" onClick={() => setActorsNum(actorsNum + 10)}>Смотреть еще...</button>
                    </div>}
                </Slider>

            </div>


            <ul>
                {
                    videos.map(it => {
                        return (
                            <li><button onClick={() => par(it.key)}>{it.name}</button></li>
                        )
                    })
                }
            </ul>


            {toggle && <Triller setToggle={setToggle}  videoKey={videosKey} />}
        </div>

    );
};

export default MovieInfo;