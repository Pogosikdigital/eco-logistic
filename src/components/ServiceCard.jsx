import React, { memo } from "react";
import { Link } from "react-router-dom";

function ServiceCard({ title, desc, img, position, href }) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href
    ? { to: href, className: "service-card-link", "aria-label": `${title} service page` }
    : { className: "service-card-link", "aria-label": `${title} transport service` };

  return (
    <Wrapper {...wrapperProps}>
      <article
        className="service-card"
        itemScope
        itemType="https://schema.org/Product"
        itemProp="itemListElement"
        role="listitem"
      >
        <meta itemProp="position" content={String(position)} />

        <div className="service-img-wrapper">
          <img
            src={img}
            alt={`${title} transport service`}
            loading="lazy"
            decoding="async"
            width="520"
            height="360"
            itemProp="image"
          />
        </div>

        <div className="service-info">
          <h3 itemProp="name">{title}</h3>
          <p itemProp="description">{desc}</p>
        </div>
      </article>
    </Wrapper>
  );
}

export default memo(ServiceCard);
