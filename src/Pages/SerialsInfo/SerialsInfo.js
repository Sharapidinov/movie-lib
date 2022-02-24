import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import MovieHero from "../MovieHero.js";
import ActorsSlider from "../ActorsSlider.js";
import Triller from "../MovieInfo/Triller.js";
import {LanguageContext} from "../../languageCotext/LanguageContext.js";

const SerialsInfo = () => {

    const [serial, setSerial] = useState({})
    const [crew, setCrew] = useState([])
    const [actors, setActors] = useState([])
    const [videos, setVideos] = useState([])
    const [videosKey, setVideosKey] = useState("")
    const [actorsNum, setActorsNum] = useState(10)
    const [coords, setCoords] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [image, setImage] = useState([])
    const {language} = useContext(LanguageContext)


    const nav = useNavigate()

    const {id} = useParams()
    useEffect(()=>{
       const job = ["Director", "Screenplay", "Original Music Composer", "Writer"]
        axios(`https://api.themoviedb.org/3/tv/${id}?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setSerial(data))

        axios(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => {
                setActors(data.cast)
                setCrew(data.crew.filter(it => job.includes(it.jobs[0].job)).splice(0, 5))
            })

        axios(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => setVideos(data.results))

        axios(`https://api.themoviedb.org/3/tv/${id}/images?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}`)
            .then(({data}) => {
                setImage(data.posters)
            })

    },[id, language])

    const goToInfo = (id, e) => {
        if (Math.abs(e.clientX - coords) < 5)
            nav(`/actor/${id}`)

    }

    const par = (key) => {
        console.log(key)
        setVideosKey(key)
        setToggle(true)
    }
    return (
        <div key={serial.id} className="pad">
            <MovieHero language={language} info={serial} crew={crew}/>
            <ActorsSlider actors={actors} actorsNum={actorsNum} setCoords={setCoords} goToInfo={goToInfo}
                          setActorsNum={setActorsNum}/>

            <div className="row">
                {
                    videos.map((it, index) => {
                        return (
                            <div className="col-3">
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


            {toggle && <Triller setToggle={setToggle} videoKey={videosKey}/>}
        </div>
    );
};

export default SerialsInfo;