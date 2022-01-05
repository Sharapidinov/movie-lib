import React from 'react';

const Triller = ({setToggle, videoKey}) => {
    return (
        <div onClick={() => setToggle(false)} className="position-fixed h-100 w-100 triller-bg top-0">
            <div className="d-flex justify-content-center align-items-center h-100">
                <iframe width="870" height="515" src={`https://www.youtube.com/embed/${videoKey}`}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        </div>
    );
};

export default Triller;