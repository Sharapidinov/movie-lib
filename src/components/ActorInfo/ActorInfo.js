import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import anon from "../img/anon.jpeg";

const ActorInfo = () => {
    const params = useParams()
    const [actor, setActor] = useState({})
    const [films, setFilms] = useState([])
    const [actorsNum, setActorsNum] = useState(10)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setActor(data))

        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setFilms(data.cast))
    }, [])

    return (
        <div key={actor.id} className="container">
            <div className="row">
                <div className="col-3">
                    <div className="card w-100">
                        <img className="w-100" src={`https://image.tmdb.org/t/p/w400${actor.profile_path}`} alt=""/>
                    </div>
                </div>
                <div className="col-9 mb-3">
                    <h3 className="mb-5">{actor.name}</h3>
                    <div className="text">
                        <span className="mb-3 d-block fs-4 fw-bold">Биография</span>
                        {actor.biography}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                <div className="box">
                    <p className="mb-1 fs-5 fw-bold">Персональная информация:</p>
                    <p className="mb-1 fw-bold">Популярность:</p>
                    <div className="mb-2">{actor.popularity}</div>
                    <p className="mb-1 fw-bold">Пол:</p>
                    <div className="mb-2">{(actor.gender === 2)? 'Мужской': `Женский`}</div>
                    <p className="mb-1 fw-bold">Дата рождения:</p>
                    <div className="mb-2">{actor.birthday}</div>
                    <p className="mb-1 fw-bold">Место рождения:</p>
                    <div className="mb-2">{actor.place_of_birth}</div>
                    <p className="mb-1 fw-bold">Также известен как:</p>
                    {
                        actor?.also_known_as?.map(it => <div className="mb-2">{it}</div> )
                    }
                </div>
                </div>
                <div className="col-9">
                    <div className="d-flex overflow-auto">
                        {
                            films?.slice(0, actorsNum)?.map(it => {
                                return (
                                    <div className="h-25">
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
                        {actorsNum < films.length && <div className="d-flex align-items-center text-center">
                            <button className="btn" onClick={()=> setActorsNum(actorsNum + 10)}>Смотреть еще...</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorInfo;