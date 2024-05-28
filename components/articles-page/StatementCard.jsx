import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
export default function StatementCard(props) {
  const [showModal, setShowModal] = useState(false);
  const modal = {
    open: () => setShowModal(true),
    close: () => {
      console.log("Close Modal");
      setShowModal(false);
    },
  };
  return (
    <section className="mb-1 w-70 p-1 p-lg-2 bg-white shadow rounded-3">
      <Modal
        show={showModal}
        onHide={modal.close}
        fullscreen={true}
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Full Statement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed
            src={props.link}
            type="application/pdf"
            width="100%"
            height="95%"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={modal.close}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      {/* <div className="bg-white shadow rounded-3 p-5 m-2 m-lg-3 partner-width"> */}
      {/* <small className="text-muted mb-4">by {props.author}</small> */}
      {/* <p>{props.description}</p> */}
      <div className="p-1" role="button" onClick={modal.open}>
        <h5 className="fw-bold mb-0 press-statement-title">{props.title}</h5>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faClock} className="me-2 text-muted" />
          <p className="text-muted m-0">{props.date}</p>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
