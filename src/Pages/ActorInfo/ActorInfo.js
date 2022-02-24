import React, {useEffect, useRef, useState, useContext} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import anon from "../../components/img/anon.jpeg";
import Spinner from "../../components/Spinner/Spinner.js";
import Img from "../MovieInfo/Img.js";
import insta from "../../components/img/insta.png";
import face from "../../components/img/face.png";
import tweeter from "../../components/img/tweeter.png";
import {LanguageContext} from "../../languageCotext/LanguageContext.js";

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
    const {language} = useContext(LanguageContext)


    useEffect(() => {
        const p1 = axios(`https://api.themoviedb.org/3/person/${params.id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setActor(data))

        const p2 = axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setFilms(data.cast))

        const p3 = axios(`https://api.themoviedb.org/3/person/${params.id}/external_ids?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setSocial(data))


        Promise.all([p1,p2,p3])
            .catch(e => console.log(e) )
            .finally(() => setSpinner(false))

    }, [params.id, language])

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
                               <span className="text-on-image">{(language === "ru-RU") ?"Увеличить" : "Increase"}</span>
                           </div>
                       </div>
                   </div>
                   <div className="col-9 mb-3">
                       <h3 className="mb-5">{actor.name}</h3>
                       <div ref={biographyRef} className={`text position-relative ${!biography && "biography"}`}>
                           <span className="mb-3 d-block fs-4 fw-bold">{(language === "ru-RU") ? "Биография" : "Biography"}</span>
                           { (language === "ru-RU") ? actor.biography || "Нет биографии" : actor.biography || "No biography"}
                           <div hidden={biography} className="gradient"> </div>
                       </div>
                       <button className="text-btn" hidden={biography} onClick={() => setBiography(true)}> {(language === "ru-RU")? "Читать дальше..." : "Read more..."} </button>
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

                           <p className="mb-1 fs-5 fw-bold">{(language === "ru-RU")?"Персональная информация:" : "Personal information"}</p>
                           <p className="mb-1 fw-bold">{(language === "ru-RU")? "Популярность:" : "Popularity"}</p>
                           <div className="mb-2">{actor.popularity}</div>
                           <p className="mb-1 fw-bold">{(language === "ru-RU")? "Пол:" : "Gender"}</p>
                           <div className="mb-2">{(language === "ru-RU")?(actor.gender === 2) ? 'Мужской' : `Женский` :(actor.gender === 2) ? 'Male' : `Female` }</div>
                           <p className="mb-1 fw-bold">{(language === "ru-RU")?"Дата рождения :" : "Date of Birth"}</p>
                           <div className="mb-2">{actor.birthday}</div>
                           <p className="mb-1 fw-bold">{(language === "ru-RU")?"Место рождения:" : "Birthplace"}</p>
                           <div className="mb-2">{actor.place_of_birth}</div>
                           <p className="mb-1 fw-bold">{(language === "ru-RU")?"Также известен как:" :"Also known as:"}</p>
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
                                       <div className="h-25 p-2">
                                           <div className="card h-100 p-3 m-2 d-flex flex-column justify-content-between">
                                               <Link className=" h-100 text-decoration-none text-black" to={`/info/${it.id}`}>
                                                   <img className="actor-img"
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
                               <button className="btn" onClick={() => setActorsNum(actorsNum + 10)}>{(language === "ru-RU")? "Смотреть еще..." : "See more..."}
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