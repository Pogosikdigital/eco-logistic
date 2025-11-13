import React from "react";

export default function ServiceCard({ title, desc, img }) {
  return (
    <div className="service-card">
      <div className="service-img-wrapper">
        <img src={img} alt={title} loading="lazy" />
      </div>

      <div className="service-info">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}
