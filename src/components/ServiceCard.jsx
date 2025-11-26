// src/components/ServiceCard.jsx
import React, { memo } from "react";

function ServiceCard({ title, desc, img, position }) {
  return (
    <article
      className="service-card"
      itemScope
      itemType="https://schema.org/Product"
      itemProp="itemListElement"
      role="listitem"
      aria-label={`${title} transport service`}
    >
      <meta itemProp="position" content={String(position)} />

      <div className="service-img-wrapper">
        <img
          src={img}
          alt={`${title} transport service`}
          loading="lazy"
          decoding="async"
          itemProp="image"
        />
      </div>

      <div className="service-info">
        <h3 itemProp="name">{title}</h3>
        <p itemProp="description">{desc}</p>
      </div>
    </article>
  );
}

export default memo(ServiceCard);
