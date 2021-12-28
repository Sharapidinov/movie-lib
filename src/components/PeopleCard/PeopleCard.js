import React from 'react';
import {Link} from "react-router-dom";

const PeopleCard = ({it}) => {

    return (
        <div key={it.id} className="col-sm-6 col-mb-4 col-lg-3">
            <div className="card mb-5" style={{width: '18rem'}}>
                <Link to={`/actor/${it.id}`}><img src={ `https://image.tmdb.org/t/p/w400${it.profile_path}` } className="card-img-top" alt={it.title}/></Link>
                <div className="card-body">
                    <h5 className="card-title">{it.name}</h5>
                    <p className="card-text text-muted">{it.release_date}</p>
                    <p className="card-text text-muted">Popularity: {Math.ceil(it.popularity / 10)} </p>
                </div>
            </div>
        </div>

    );
};

export default PeopleCard;