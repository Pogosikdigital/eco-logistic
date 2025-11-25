// src/components/ServiceCard.jsx
import React, { memo, useCallback } from "react";

function ServiceCard({ title, desc, img, position }) {
  const handleMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    card.style.setProperty("--hover-x", x);
  }, []);

  const handleLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.setProperty("--hover-x", 0.5);
  }, []);

  return (
    <article
      className="service-card"
      role="listitem"
      itemScope
      itemType="https://schema.org/Product"
      itemProp="itemListElement"
      aria-label={`${title} transport service`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <meta itemProp="position" content={String(position)} />

      <div className="service-img-wrapper">
        <img
          src={img}
          alt={`${title} vehicle transport service`}
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
