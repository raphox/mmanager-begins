import React from "react";

function Room({ id, number, description, state }) {
  return (
    <div className={`card card-state-${state}`}>
      <header className="card-header">
        <p className="card-header-title">{description}</p>
        <p className="card-header-icon">{number}</p>
      </header>
      <div className="card-content">
        <div className="content">{description}</div>
      </div>
      <footer className="card-footer">
        <a href="#{id}" className="card-footer-item">
          Save
        </a>
        <a href="#{id}" className="card-footer-item">
          Edit
        </a>
        <a href="#{id}" className="card-footer-item">
          Delete
        </a>
      </footer>
    </div>
  );
}

export default Room;
