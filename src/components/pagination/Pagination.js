import React from 'react';

const Pagination = ({page, setPage,setQuery}) => {

   const changePage = (num) => {
        setPage(num)
       setQuery({page: String(num)})
   }
    return (
        <div key={page * 2} className="btn-container">
            {page > 1 && <button onClick={() => changePage(1)} className='btn btn-primary'>{1}</button>}
            {page > 4 && <span className="me-2">...</span>}
            {page >= 3 && <button onClick={() => changePage(page - 1)} className='btn btn-primary'>{page - 1}</button>}
            <button disabled={true} className='btn btn-primary'>{page}</button>
            {page < 99 && <button onClick={() => changePage(page + 1)} className='btn btn-primary'>{page + 1}</button>}
            {page < 98 && <span className="me-2">...</span>}
            {page < 100 && <button onClick={() => changePage(100)} className='btn btn-primary'>{100}</button>}
        </div>
    );
};

export default Pagination;