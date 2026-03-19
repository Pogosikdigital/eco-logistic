import React, { memo } from "react";
import { Link } from "react-router-dom";

function ServiceCard({ title, desc, img, position, href }) {
  const Wrapper = href ? Link : "div";

  const wrapperProps = href
    ? {
        to: href,
        className: "service-card-link",
        "aria-label": `${title} service page`,
      }
    : {
        className: "service-card-link",
        "aria-label": `${title} transport service`,
      };

  const absoluteUrl = href
    ? `https://www.ecohublogistics.com${href}`
    : undefined;

  return (
    <Wrapper {...wrapperProps}>
      <article
        className="service-card"
        itemScope
        itemType="https://schema.org/ListItem"
        itemProp="itemListElement"
        role="listitem"
      >
        <meta itemProp="position" content={String(position)} />

        <div itemProp="item" itemScope itemType="https://schema.org/Service">
          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={desc} />
          {absoluteUrl ? <meta itemProp="url" content={absoluteUrl} /> : null}
          <meta itemProp="areaServed" content="US" />

          <div
            itemProp="provider"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <meta itemProp="name" content="EcoHub Logistics" />
            <meta itemProp="url" content="https://www.ecohublogistics.com/" />
            <meta itemProp="telephone" content="+1-650-999-9660" />
          </div>

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
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
      </article>
    </Wrapper>
  );
}

export default memo(ServiceCard);