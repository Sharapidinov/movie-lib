import React, {useState} from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import Img from "./MovieInfo/Img";


const MovieHero = ({info, crew, language}) => {


    const [open, setOpen] = useState(true)

    return (
        <section style={{
            background: `#473a41 url(https://image.tmdb.org/t/p/original${info.belongs_to_collection?.backdrop_path || info.backdrop_path}) center/cover`,
            backgroundBlendMode: ` overlay `
        }} className="card ">
            <div className="container align-items-center m-auto">
                <div className="row">
                    <div className="col-xl-4 col-sm-6">
                        <div onClick={() => setOpen(false)} className="position-relative">
                            <img className="w-100 poster" src={`https://image.tmdb.org/t/p/w400${info.poster_path}`} alt=""/>
                            <span className="text-on-image">{(language === "ru-RU") ?"Увеличить" : "Increase"}</span>
                        </div>
                    </div>
                    <div className="col-8 text-light p-3">
                        <h1 className="card-title  text-light">{info.title || info.name}</h1>
                        <div>( {info.release_date || info.first_air_date} )</div>
                        <div className="d-flex mb-3 text-light ">
                            &bull;
                            &ensp;
                            {info.genres?.map(it => <div className="text-light me-3">  {it.name}</div>)}
                            &bull;
                        </div>
                        <div className="text-light mb-3"> {
                            (language === "ru-RU")
                            ? `Длительность ${info.runtime || info.episode_run_time} минут`
                            : `Duration ${info.runtime || info.episode_run_time} minutes`}
                        </div>
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
                            <div>{(language === "ru-RU")?"Пользовательский счёт": "Votes average"}</div>
                        </div>
                        


                        <p className="card-subtitle text-light mb-3">{info.overview}</p>

                        <div className="text d-flex flex-wrap">
                            {
                                crew.map(it => {
                                    return (
                                        <div className="col-4">
                                            <h5>{it.name }</h5>
                                            <p>{it.job || it.jobs[0].job}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            {open || <Img info={info} setOpen={setOpen}/> }
        </section>
    );
};

export default MovieHero;