import React, {useEffect, useState,useContext} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import 'react-circular-progressbar/dist/styles.css';
import Triller from "./Triller.js";
import Spinner from "../../components/Spinner/Spinner.js";
import MovieHero from "../MovieHero.js";
import ActorsSlider from "../ActorsSlider.js";
import insta from "../../components/img/insta.png";
import face from "../../components/img/face.png";
import tweeter from "../../components/img/tweeter.png";
import {LanguageContext} from "../../languageCotext/LanguageContext.js";


const MovieInfo = () => {

    const [info, setInfo] = useState({})
    const [actors, setActors] = useState([])
    const [crew, setCrew] = useState([])
    const [videos, setVideos] = useState([])
    const [videosKey, setVideosKey] = useState("")
    const [actorsNum, setActorsNum] = useState(10)
    const [toggle, setToggle] = useState(false)
    const [coords, setCoords] = useState(0)
    const [image, setImage] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [social, setSocial] = useState({})
    const {language} = useContext(LanguageContext)

    const params = useParams()

    const nav = useNavigate()


    useEffect(() => {

        const p1 = axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => {
                setInfo(data)
            })

        const p2 = axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => {
                setActors(data.cast)
                setCrew(data.crew.filter(it => it.job === `Director` || it.job === `Screenplay`))
            })

        const p3 = axios(`https://api.themoviedb.org/3/movie/${params.id}/images?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => {
                setImage(data.posters)
            })

        const p4 = axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setVideos(data.results))

            const  p5 = axios(`https://api.themoviedb.org/3/movie/${params.id}/external_ids?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
                .then(({data}) => {
                    setSocial(data)
                })

        Promise.all([p1, p2, p3, p4, p5])
            .catch(e => console.log(e))
            .finally(() => setSpinner(false))


    }, [params, language])


    const par = (key) => {
        setVideosKey(key)
        setToggle(true)
    }

    const goToInfo = (id, e) => {
        if (Math.abs(e.clientX - coords) < 5)
            nav(`/actor/${id}`)

    }


    if (spinner) return <Spinner/>

    return (
        <div key={info.id} className="pad">

            <MovieHero info={info} social={social} crew={crew} language={language}/>

           <div className="container">
               <div className="row">
                   <div className="col-9">
                       <ActorsSlider actors={actors} actorsNum={actorsNum} setCoords={setCoords} goToInfo={goToInfo}
                                     setActorsNum={setActorsNum}/>
                   </div>

                   <div className="col-3">
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


                       <p className="mb-1 fw-bold">{(language === "ru-RU")?"Исходное название:": "Original title:"}</p>
                       <div className="mb-2">{info.original_title}</div>

                       <p className="mb-1 fw-bold">{(language === "ru-RU")?"Статус:": "Status:"}</p>
                       <div className="mb-2">{info.status}</div>

                       <p className="mb-1 fw-bold">{(language === "ru-RU")?"Бюджет:":"Budget"}</p>
                       <div className="mb-2">{info.budget.toLocaleString()}$</div>

                       <p className="mb-1 fw-bold">{(language === "ru-RU")?"Сборы:" : "Revenue:"}</p>
                       <div className="mb-2">{info.revenue.toLocaleString()}$</div>



                   </div>
               </div>
           </div>


            <div className="container">
                <div className="d-flex p-4 flex-wrap align-items-center justify-content-around">
                    {
                        videos.map((it, index) => {
                            return (
                                <div className="col-sm-12 col-md-6 col-3 align-items-center">
                                    <button className="border-0 p-2 w-50 bg-white" onClick={() => par(it.key)}>
                                        <img className="w-100"
                                             src={`https://image.tmdb.org/t/p/w300${image[index]?.file_path}`} alt=""/>
                                        {it.name}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            {toggle && <Triller setToggle={setToggle} videoKey={videosKey}/>}
        </div>

    );
};

export default MovieInfo;