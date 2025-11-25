import React from "react";
import "./why.css";

// 3 реальные фото
import photoRefer from "../assets/photo-refer.jpg";
import photoLogistics from "../assets/photo-logistics.jpg";
import photoFlexible from "../assets/photo-flexible.jpg";

export default function WhyPartner() {
  return (
    <section className="why-wrapper" id="why">
      <div className="why-inner">

        <h2 className="why-title">Why Partner With Us?</h2>
        <p className="why-subtitle">
          Start earning today by helping others ship their vehicles
          with a trusted and reliable service!
        </p>

        <div className="why-grid">

          {/* CARD 1 */}
          <div className="why-card">
            <div className="why-card-inner">
              <div className="why-img-frame">
                <img src={photoRefer} alt="Refer and Earn" />
              </div>
              <p className="why-text">
                No Commitment, No Fees — Just Refer And Earn
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="why-card">
            <div className="why-card-inner">
              <div className="why-img-frame">
                <img src={photoLogistics} alt="We Handle Logistics" />
              </div>
              <p className="why-text">
                We Handle All The Logistics — You Reap The Rewards
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="why-card">
            <div className="why-card-inner">
              <div className="why-img-frame">
                <img src={photoFlexible} alt="Flexible Income" />
              </div>
              <p className="why-text">
                Perfect For Anyone Looking For A Flexible Way To Earn Extra Income
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}