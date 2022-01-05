import React from 'react';
import {Link} from "react-router-dom";

const MovieCard = ({it}) => {
    return (
        <div key={it.id} className="col-sm align-items-center  col-mb-6 col-lg-4 col-xxl-3 mb-5">
            <div className="card h-100" style={{width: '18rem'}}>
               <Link to={`/info/${it.id}`}><img src={ `https://image.tmdb.org/t/p/w400${it.poster_path}` } className="card-img-top" alt={it.title}/></Link>
                <div className="card-body">
                    <Link className="text-decoration-none text-black" to={`/info/${it.id}`}><h5 className="card-title">{it.title}</h5></Link>
                    <p className="card-text text-muted">{it.release_date}</p>
                    <p className="card-text text-muted">Popularity: {it.popularity} </p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;