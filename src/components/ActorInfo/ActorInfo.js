import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import anon from "../img/anon.jpeg";
import Spinner from "../Spinner/Spinner";
import Img from "../MovieInfo/Img";
import insta from "../img/insta.png";
import face from "../img/face.png";
import tweeter from "../img/tweeter.png";

const ActorInfo = () => {
    const params = useParams()
    const [actor, setActor] = useState({})
    const [films, setFilms] = useState([])
    const [actorsNum, setActorsNum] = useState(10)
    const [spinner, setSpinner] = useState(true)
    const [biography, setBiography] = useState(false)
    const [open, setOpen] = useState(true)
    const [social, setSocial] = useState({})
    const biographyRef = useRef(null)

    useEffect(() => {
        const p1 = axios(`https://api.themoviedb.org/3/person/${params.id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setActor(data))

        const p2 = axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setFilms(data.cast))

        const p3 = axios(`https://api.themoviedb.org/3/person/${params.id}/external_ids?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=ru`)
            .then(({data}) => setSocial(data))


        Promise.all([p1,p2,p3])
            .catch(e => console.log(e) )
            .finally(() => setSpinner(false))

    }, [params.id])

    useEffect(() => {
        if(!spinner && parseInt(window.getComputedStyle(biographyRef.current).height) < 300){
            setBiography(true)
        }
    },[spinner])


    if (spinner) return <Spinner/>
    return (
        <div >
           <div key={actor.id} className="container pad ">
               <div className="row">
                   <div className="col-3">
                       <div className="card w-100">
                           <div onClick={() => setOpen(false)} className="position-relative">
                               <img className="w-100 poster" src={`https://image.tmdb.org/t/p/w400${actor.profile_path}`} alt=""/>
                               <span className="text-on-image">Увеличить</span>
                           </div>
                       </div>
                   </div>
                   <div className="col-9 mb-3">
                       <h3 className="mb-5">{actor.name}</h3>
                       <div ref={biographyRef} className={`text position-relative ${!biography && "biography"}`}>
                           <span className="mb-3 d-block fs-4 fw-bold">Биография</span>
                           {actor.biography || "Нет биографии"}
                           <div hidden={biography} className="gradient"> </div>
                       </div>
                       <button className="text-btn" hidden={biography} onClick={() => setBiography(true)}> Читать дальше... </button>
                   </div>
               </div>

               <div className="row">
                   <div className="col-3">
                       <div className="box">

                               <div className="d-flex align-items-center justify-content-around mt-3 mb-3">
                                   {social.instagram_id &&  <a className="links me-2" href={`https://www.instagram.com/${social.instagram_id}`}>
                                       <img className="w-75" src={insta} alt=""/>
                                   </a>}

                                   {social.facebook_id && <a className="links me-2" href={`https://www.facebook.com/${social.facebook_id}`}>
                                       <img className="w-75" src={face} alt=""/>
                                   </a>}

                                   {social.twitter_id && <a className="links " href={`https://twitter.com/${social.twitter_id}`}>
                                       <img className="w-75" src={tweeter} alt=""/>
                                   </a>}
                               </div>

                           <p className="mb-1 fs-5 fw-bold">Персональная информация:</p>
                           <p className="mb-1 fw-bold">Популярность:</p>
                           <div className="mb-2">{actor.popularity}</div>
                           <p className="mb-1 fw-bold">Пол:</p>
                           <div className="mb-2">{(actor.gender === 2) ? 'Мужской' : `Женский`}</div>
                           <p className="mb-1 fw-bold">Дата рождения:</p>
                           <div className="mb-2">{actor.birthday}</div>
                           <p className="mb-1 fw-bold">Место рождения:</p>
                           <div className="mb-2">{actor.place_of_birth}</div>
                           <p className="mb-1 fw-bold">Также известен как:</p>
                           {
                               actor?.also_known_as?.map(it => <div className="mb-2">{it}</div>)
                           }
                       </div>

                   </div>
                   <div className="col-9">
                       <div className="d-flex overflow-auto">
                           {
                               films?.slice(0, actorsNum)?.map(it => {
                                   return (
                                       <div className="h-25 w-50 p-2">
                                           <div className="card h-100 w-100 p-3 m-2 d-flex flex-column justify-content-between   ">
                                               <Link className="w-75 h-75 text-decoration-none text-black" to={`/info/${it.id}`}>
                                                   <img className=""
                                                        src={it.poster_path ? `https://image.tmdb.org/t/p/w300${it.poster_path}` : anon}
                                                        alt={it.title}/>
                                                   <h5> {it.title} </h5>
                                               </Link>
                                           </div>
                                       </div>
                                   )
                               })
                           }
                           {actorsNum < films.length && <div className="d-flex align-items-center text-center">
                               <button className="btn" onClick={() => setActorsNum(actorsNum + 10)}>Смотреть еще...
                               </button>
                           </div>}
                       </div>
                   </div>

           </div>
            {open || <Img info={actor} setOpen={setOpen}/> }
               </div>
        </div>

    )
}

export default ActorInfo;