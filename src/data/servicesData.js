// src/data/servicesData.js

import Bmw from "../assets/bmw.webp";
import Delivery from "../assets/delivery.webp";
import Boat from "../assets/Boat.webp";
import Lineage from "../assets/Lineage.webp";
import Buggy from "../assets/Buggy.webp";
import Enclosed from "../assets/enclosed.webp";




export const servicesData = [
  {
    id: 1,
    title: "Operable Vehicle Transport",
    desc: "Efficient transport for vehicles able to drive onto the trailer.",
    img: Bmw,
    href: "/services/car-shipping"
  },
  {
    id: 2,
    title: "Inoperable Vehicle Transport",
    desc: "Safe winch-assisted transport for non-running cars.",
    img: Delivery,
    href: "/services/inoperable-vehicle-transport"

  },
  {
    id: 3,
    title: "Boat Transport",
    desc: "Reliable transport for boats, jet skis, and marine equipment.",
    img: Boat,
    href: "/services/boat-transport"

  },
  {
    id: 4,
    title: "RV, Motorhome & Semi-Truck Transport",
    desc: "Heavy-duty transport for oversized vehicles across the USA.",
    img: Lineage,
    href: "/services/rv-motorhome-semitruck-transport"

  },
  {
    id: 5,
    title: "Motorcycle, ATV & Buggy Transport",
    desc: "Fast, insured shipping for recreational vehicles.",
    img: Buggy,
    href: "/services/motorcycle-shipping",
  },
  {
    id: 6,
    title: "Enclosed Trailer Transport",
    desc: "Maximum protection for exotic and luxury vehicles.",
    img: Enclosed,
    href: "/services/enclosed-transport"
  }
];
