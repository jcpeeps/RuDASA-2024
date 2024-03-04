import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

export default function ContactCard(props) {
  return (
    <Link
      href={props.email}
      target="_blank"
      rel="noreferrer"
      className="text-decoration-none text-black"
    >
      <div className="bg-white rounded-3 shadow d-flex justify-content-between align-items-center p-4 card-width m-1 m-lg-2 contact-card">
        <div>
          <p className="fw-bold mb-1">{props.role}</p>
          <p className="mb-0 ms-2">
            {props.title} {props.name}
          </p>
        </div>
        <FontAwesomeIcon icon={faEnvelope} className="text-primary fs-3" />
      </div>
    </Link>
  );
}
