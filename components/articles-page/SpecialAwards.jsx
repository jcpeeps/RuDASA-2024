import React from 'react'
import {useState} from 'react';
import {useEffect} from 'react';
import SpecialAwardCard from './SpecialAwardCard';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchJson from '../../lib/fetchJson';
export default function SpecialAwards({ files }) {
    const [awards, setAwards] = useState(files.slice(0, 5));
    const [page, setPage] = useState(0);
    function next () {
        if (files.length > (page + 1)*5) 
            setPage(page+1);
    }
    function prev () {
        if (page > 0) 
            setPage(page-1);
    }
    useEffect(() =>{
        setAwards(files.slice(page*5, (page*5)+ 5));
    }, [page])
    useEffect(() => {
        if (awards[0].frontmatter) return;
        const response = fetch(`/api/getSpecialAwards`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json" 
            },
            body: JSON.stringify({files: awards})
        })
        .then(res => res.json())
        .then(json => {
            setAwards(json.message ?? [])
        });

    }, [awards])
    return (
        <section className="bg-light">
            <div className="container px-4 px-lg-0 py-2 py-lg-4">
                <h3 className="my-4 pb-4 fw-bold mt-5">Special Awards</h3>
                <div className="d-flex flex-wrap">
                    {awards.map((award, index) => awards[0]?.frontmatter != undefined && (
                        <SpecialAwardCard 
                            key={index} 
                            name={award?.frontmatter?.name} 
                            location={award?.frontmatter?.location} 
                            hospital={award?.frontmatter?.hospital} 
                            year={award?.frontmatter?.year} 
                            content={award?.content} 
                            image={award?.frontmatter?.image}
                            date={award?.frontmatter?.date}
                        />
                    ))}
                </div>
            </div>
            <div className="pagination-controls d-flex justify-content-center align-items-center" >
            <div className="d-flex justify-content-center align-items-center shadow" >
                <button onClick={prev} className="border-0 border-white"><FontAwesomeIcon icon={faAngleLeft} className="text-primary" size="2x"/></button>
                <div id="pageDiv" className="border-0 border-white d-flex align-items-center"><p className="p-0 m-0 px-2">Page: {page+1}</p></div>
                <button onClick={next} className="border-0 border-white"><FontAwesomeIcon icon={faAngleRight} className="text-primary" size="2x"/></button>
            </div></div>
        </section>
    )
}
