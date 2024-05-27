import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
export default function StatementCard(props) {
  function openModal() {
    props.modal.setContent({
      title: props.title,
      body: props.content,
    });
    props.modal.open();
  }
  function openModalPDF() {
    props.modal.setContent({
      title: "",
      body: (
        <embed
          src={props.link}
          type="application/pdf"
          width="100%"
          height="95%"
        />
      ),
    });
    props.modal.open();
  }
  return (
    <section className="mb-2 mb-lg-5 p-4 p-lg-5 bg-white shadow rounded-3">
      {/* <div className="bg-white shadow rounded-3 p-5 m-2 m-lg-3 partner-width"> */}
      <h5 className="fw-bold mb-3">{props.title}</h5>
      <small className="text-muted mb-4">by {props.author}</small>
      <p>{props.description}</p>
      <div className="d-flex justify-content-between align-items-end">
        {/* <div className="hover-button">
                    <a href={props.link} target="_blank" role="button" className="btn btn-primary text-white mt-4">Read</a>
                </div> */}
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faClock} className="me-2 text-muted" />
          <p className="text-muted m-0">{props.date}</p>
        </div>
      </div>
      {props.content && (
        <button
          onClick={openModal}
          className="btn btn-primary text-white mt-4 me-4"
        >
          Read More
        </button>
      )}
      {props?.link?.includes("pdfs/press-statements") && (
        <button
          onClick={openModalPDF}
          className="btn btn-primary text-white mt-4"
        >
          View Full PDF
        </button>
      )}
      {/* </div> */}
    </section>
  );
}
