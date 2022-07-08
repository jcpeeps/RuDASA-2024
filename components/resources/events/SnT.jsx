import React from 'react'
import Image from 'next/image'
import Illustration4 from '../../../media/svg/snt-students.svg'

export default function SnT () {
    return (
        <div className="d-flex flex-column">
            <h4 className="w-100 fw-bold">Survive and Thrive</h4>
            <div className="d-flex flex-wrap col-12 col-lg-10 my-3 mb-5">
                <div className="d-flex flex-wrap flex-lg-nowrap">
                    <div className="bg-white rounded shadow p-5 m-2 col-12 col-lg-7">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime error, minima laborum aliquam nihil obcaecati cum fugiat, nobis suscipit commodi voluptatem quia laboriosam ut illum eius excepturi. Quisquam, quod.</div>
                    <div className="bg-white rounded shadow p-5 m-2 col-12 col-lg-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime error, minima laborum aliquam nihil obcaecati cum fugiat, nobis suscipit commodi voluptatem quia laboriosam ut illum eius excepturi. Quisquam, quod.</div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap">
                    <div className="bg-white rounded shadow p-5 m-2 col-12 col-lg-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime error, minima laborum aliquam nihil obcaecati cum fugiat, nobis suscipit commodi voluptatem quia laboriosam ut illum eius excepturi. Quisquam, quod.</div>
                    <div className="bg-white rounded shadow p-5 m-2 col-12 col-lg-7">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime error, minima laborum aliquam nihil obcaecati cum fugiat, nobis suscipit commodi voluptatem quia laboriosam ut illum eius excepturi. Quisquam, quod.</div>
                </div>
            </div>
            <h4 className="w-100 fw-bold">Survive and Thrive Students</h4>
            <div className="d-flex align-items-center col-12">
                <div className="d-flex flex-column col-12 col-lg-7">
                    <div className="bg-white rounded shadow p-5 m-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime error, minima laborum aliquam nihil obcaecati cum fugiat, nobis suscipit commodi voluptatem quia laboriosam ut illum eius excepturi. Quisquam, quod.</div>
                    <div className="bg-white rounded shadow p-5 m-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime error, minima laborum aliquam nihil obcaecati cum fugiat, nobis suscipit commodi voluptatem quia laboriosam ut illum eius excepturi. Quisquam, quod.</div>
                </div>
                <Image src={Illustration4} classname="col-12 col-lg-5"/>
            </div>
        </div>
    )
}