import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import StatementCard from "./StatementCard";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchJson from "../../lib/fetchJson";

import Modal from "react-bootstrap/Modal";
export default function PressStatements(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const modal = {
    open: () => setShowModal(true),
    close: () => setShowModal(false),
    setContent: (content) => setModalContent(content),
  };
  const files = props.files;
  const [statements, setStatements] = useState(files?.slice(0, 5));
  // const [statements, setStatements] = useState(files);
  console.log("Statements: ", statements);
  const [page, setPage] = useState(0);
  function next() {
    if (files.length > (page + 1) * 5) setPage(page + 1);
  }
  function prev() {
    if (page > 0) setPage(page - 1);
  }
  useEffect(() => {
    setStatements(files.slice(page * 5, page * 5 + 5));
  }, [page]);
  useEffect(() => {
    if (statements?.[0]?.frontmatter) return;
    const response = fetch(`/api/getPressStatements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ files: statements }),
    })
      .then((res) => res.json())
      .then((json) => {
        setStatements(json.message ?? []);
      });
  }, [statements]);
  return (
    <section className="bg-light">
      <div className="container px-4 px-lg-0 py-2 py-lg-4">
        <h3 className="my-4 pb-4 fw-bold mt-5">Press Statements</h3>

        <Modal
          show={showModal}
          fullscreen={true}
          onHide={modal.close}
          dialogClassName="modal-90w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Full Statement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent.title && <h3>{modalContent.title}</h3>}
            {modalContent.Description}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={modal.close}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex flex-wrap">
          {statements?.map(
            (statement, index) =>
              statements[0]?.frontmatter != undefined && (
                <StatementCard
                  title={statement?.frontmatter?.title}
                  author={statement?.frontmatter?.author}
                  description={statement?.frontmatter?.description}
                  link={statement?.frontmatter?.link}
                  date={statement?.frontmatter?.date}
                  content={statement?.content}
                  key={index}
                  modal={modal}
                />
              )
          )}
        </div>
      </div>
      <div className="pagination-controls d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center shadow">
          <button onClick={prev} className="border-0 border-white">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-primary"
              size="2x"
            />
          </button>
          <div
            id="pageDiv"
            className="border-0 border-white d-flex align-items-center"
          >
            <p className="p-0 m-0 px-2">Page: {page + 1}</p>
          </div>
          <button onClick={next} className="border-0 border-white">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-primary"
              size="2x"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
