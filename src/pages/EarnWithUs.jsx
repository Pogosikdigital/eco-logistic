import React from "react";
import "./earnwithus.css";

import iconPaperwork from "../assets/icon-paperwork.png";
import iconProfit from "../assets/icon-profit.png";
import iconSideIncome from "../assets/icon-sideincome.png";

import heroTruck from "../assets/truck1.png";
import WhyPartner from "./WhyPartner";
import DiscountProgram from "./DiscountProgram";

export default function EarnWithUs() {
  return (
    <section className="earn-hero" id="earn">
      <div className="earn-hero-bg" />

      <div className="earn-hero-inner">

        {/* LEFT SIDE */}
        <div className="earn-left">
          <span className="earn-badge">AFFILIATE & REFERRAL PROGRAM</span>

          <div className="earn-title-group">
            <h1 className="earn-title-primary">EARN WITH US</h1>
            <p className="earn-title-secondary">
              Turn your network into effortless side-income with zero risk.
            </p>
          </div>

          <p className="earn-description">
            Share our trusted vehicle shipping service with your audience and
            earn up to <span>40% of the profit</span> on each completed shipment —
            no paperwork, no fees, no business registration required.
          </p>

          <div className="earn-icon-grid">
            <div className="earn-icon-card">
              <div className="earn-icon-frame">
                <img src={iconPaperwork} alt="Paperwork icon" />
              </div>
              <p className="earn-icon-text">No paperwork</p>
            </div>

            <div className="earn-icon-card">
              <div className="earn-icon-frame">
                <img src={iconProfit} alt="Profit icon" />
              </div>
              <p className="earn-icon-text">Up to 40% profit share</p>
            </div>

            <div className="earn-icon-card">
              <div className="earn-icon-frame">
                <img src={iconSideIncome} alt="Side income icon" />
              </div>
              <p className="earn-icon-text">Perfect as a side-income</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — STATIC TRUCK WITH ANIMATION */}
        <div className="earn-right">
          <div className="earn-truck-wrapper">
            <div className="earn-truck-glow"></div>

            <img
              src={heroTruck}
              className="earn-truck-img"
              alt="truck"
            />
          </div>
        </div>

      </div>

      <WhyPartner/>
      <DiscountProgram/>
    </section>
  );
}