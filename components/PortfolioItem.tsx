"use client";

import { useState } from "react";
import { Portfolio } from "../types/portfolio";
import Link from "next/link";
import Image from "next/image";

const PortfolioItem = ({ portfolio }: { portfolio: Portfolio }) => {
  const [renderGif, setRenderGif] = useState(portfolio.imagePreview.url);

  return (
    <div className="relative group transition-all rounded-2xl overflow-hidden border-transparent border-2 lg:hover:scale-110 hover:z-30 hover:border-white">
      <div className="h-[260px]">
        <Link
          href={`portfolio/${portfolio.slug}`}
          onMouseEnter={() => setRenderGif(portfolio.imagePreviewGif.url)}
          onMouseLeave={() => setRenderGif(portfolio.imagePreview.url)}
        >
          <div className=" bg-black bg-opacity-60 absolute top-0 left-0 right-0 bottom-0 z-10 group-hover:z-20"></div>
          <div className="z-20 absolute top-0 left-0 right-0 bottom-0 p-3 flex justify-start items-end">
            <h1 className=" text-lg">{portfolio.title}</h1>
          </div>
          <Image
            src={renderGif}
            alt=""
            width={portfolio.imagePreviewGif.width}
            height={portfolio.imagePreviewGif.height}
          />
        </Link>
      </div>
    </div>
  );
};

export default PortfolioItem;
