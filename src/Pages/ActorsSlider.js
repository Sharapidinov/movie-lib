import React from 'react';
import Slider from "react-slick";
import anon from "../components/img/anon.jpeg";

const ActorsSlider = ({actors,actorsNum,setCoords,goToInfo,setActorsNum}) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 1,
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

    return (
        <div className="card p-5">

            <Slider {...settings}>
                {
                    actors?.slice(0, actorsNum)?.map(it => {
                        return (
                            <div key={it.id} className="">
                                <div className="card  p-3 m-2 d-flex flex-column justify-content-between  ">
                                    <button onMouseDown={(e) => setCoords(e.clientX)}
                                            onClick={(e) => goToInfo(it.id, e)}
                                            className="text-decoration-none button-slider text-black">
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
    );
};

export default ActorsSlider;