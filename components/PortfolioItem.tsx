"use client";

import { useState } from "react";
import { Portfolio } from "../types/portfolio";
import Link from "next/link";

const PortfolioItem = ({ portfolio }: { portfolio: Portfolio }) => {
  const [renderGif, setRenderGif] = useState(portfolio.imagePreview.url);

  return (
    <Link
      href={`portfolio/${portfolio.slug}`}
      onMouseEnter={() => setRenderGif(portfolio.imagePreviewGif.url)}
      onMouseLeave={() => setRenderGif(portfolio.imagePreview.url)}
      className="relative group transition-all rounded-2xl overflow-hidden border-transparent border-2 hover:scale-125 hover:z-30 hover:border-white"
    >
      <div className=" bg-black bg-opacity-60 absolute top-0 left-0 right-0 bottom-0 z-10 group-hover:z-20"></div>
      <div className="z-20 absolute top-0 left-0 right-0 bottom-0 p-3 flex justify-start items-end">
        <h1 className=" text-lg">{portfolio.title}</h1>
      </div>
      <img src={renderGif} alt="" />
    </Link>
  );
};

export default PortfolioItem;
