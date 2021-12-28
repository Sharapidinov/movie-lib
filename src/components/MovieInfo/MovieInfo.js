import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import axios from "axios";
import anon from "../img/anon.jpeg"
const MovieInfo = () => {

    const [info, setInfo] = useState({})
    const [actors, setActors] = useState([])
    const [crew, setCrew] = useState([])
    const [actorsNum, setActorsNum] = useState(10)

    const params = useParams()

    const nav = useNavigate()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setInfo(data))

        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => {
                setActors(data.cast)
                setCrew(data.crew.filter(it => it.job === `Director` || it.job === `Screenplay`))
            })
    }, [])


    return (
        <div key={info.id}>


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
                                <div className="border-card me-3 ">{info.vote_average * 10}%</div>
                                <div>Пользовательский счёт</div>
                            </div>

                            <p className="card-subtitle text-light">{info.overview}</p>

                            <div className="text d-flex">
                                {
                                    crew.map(it => {
                                        return(
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
            <div className="card p-5">
                <div className="d-flex overflow-auto">
                    {
                        actors?.slice(0, actorsNum)?.map(it => {
                            return (
                                <div key={it.id} className="h-25">
                                    <div className="card h-100 p-3 m-2 d-flex flex-column justify-content-between  ">
                                        <Link className="text-decoration-none text-black" to={`/actor/${it.id}`}>
                                            <img className="actor-img" src={it.profile_path? `https://image.tmdb.org/t/p/w300${it.profile_path}` : anon}
                                                 alt={it.name}/>
                                            <h5> {it.name} </h5>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {actorsNum < actors.length && <div className="d-flex align-items-center text-center">
                        <button className="btn" onClick={()=> setActorsNum(actorsNum + 10)}>Смотреть еще...</button>
                    </div>}
                </div>
            </div>

        </div>

    );
};

export default MovieInfo;