import React, {useState, useEffect, useContext} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import PeopleCard from "../components/PeopleCard/PeopleCard";
import Spinner from "../components/Spinner/Spinner";
import Pagination from "../components/pagination/Pagination";
import {LanguageContext} from "../languageCotext/LanguageContext.js";

const AllPeople = () => {
    const [query, setQuery] = useSearchParams()
    const [people, setPeople] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [page, setPage] = useState(+query.get("page"))
    const {language} = useContext(LanguageContext)


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/popular?api_key=073e2098c1a48c1fee6edef88aedd5b7&language=${language}&page=${page}`)
            .then(({data}) => {
                setPeople(data.results)
                setSpinner(false)
            } )
    },[page, language])






    if (spinner) return <Spinner/>

    return (
        <div className="container pad">


            <Pagination page={page} setQuery={setQuery} setPage={setPage}/>

            <div className="row pt-5">
                {
                    people.map(it => {
                        return(

                            <PeopleCard language={language} key={it.id} it={it}/>

                        )
                    })
                }
            </div>
            <Pagination page={page} setQuery={setQuery} setPage={setPage}/>
        </div>
    )
};

export default AllPeople;