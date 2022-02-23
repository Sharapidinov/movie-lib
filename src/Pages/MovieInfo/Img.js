import React from 'react';

const Img = ({info , setOpen}) => {
    return (
        <div onClick={() => setOpen(true)} className="position-fixed h-100 w-100 triller-bg top-0">
            <div className='d-flex justify-content-center align-items-center h-100'>
                <img src={`https://image.tmdb.org/t/p/w400/${info.poster_path || info.profile_path}`} alt=""/>
            </div>
        </div>
    );
};

export default Img;