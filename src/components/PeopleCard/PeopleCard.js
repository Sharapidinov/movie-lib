import React from 'react';
import {Link} from "react-router-dom";

const PeopleCard = ({it, language}) => {

    return (
        <div key={it.id} className="col-sm align-items-center m-auto col-mb-6 col-lg-4 col-xxl-3 mb-5">
            <div className="card mb-5" style={{width: '18rem'}}>
                <Link to={`/actor/${it.id}`}><img src={ `https://image.tmdb.org/t/p/w400${it.profile_path}` } className="card-img-top" alt={it.title}/></Link>
                <div className="card-body">
                    <Link className="text-decoration-none text-black" to={`/actor/${it.id}`} ><h5 className="card-title">{it.name}</h5></Link>
                    <p className="card-text text-muted">{it.release_date}</p>
                    <p className="card-text text-muted">{(language === "ru-RU") ?"Популярность:" : "Popularity:"} {Math.ceil(it.popularity / 10)} </p>
                </div>
            </div>
        </div>

    );
};

export default PeopleCard;