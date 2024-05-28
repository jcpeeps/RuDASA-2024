import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import StatementCard from "./StatementCard";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchJson from "../../lib/fetchJson";

export default function PressStatements(props) {
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
        <h3 className="my-2 pb-2 fw-bold mt-5">Press Statements</h3>
        <div>
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
