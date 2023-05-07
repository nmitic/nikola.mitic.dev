"use client";

import { COMPANY_TO_LOGO } from "../../../../static-data/company-to-logo-map";
import styles from "./JobLineItem.module.css";
import Image from "next/image";
import cn from "classnames";

const JobLineItem = ({
  date,
  offset,
  companyName,
  themeColor,
  isActive,
}: {
  date: string;
  offset: number;
  companyName: string;
  themeColor: string;
  isActive: boolean;
}) => {
  const companyLogoSrc =
    COMPANY_TO_LOGO[companyName as keyof typeof COMPANY_TO_LOGO];

  return (
    <div
      className={cn(styles.jobLineItem, { [styles.active]: isActive })}
      style={{ left: `${offset}%`, color: `#${themeColor}` }}
    >
      <div className={styles.date}>{date}</div>
      <div className={styles.companyName}>{companyName}</div>

      <Image
        src={companyLogoSrc}
        alt={`logo of company for the job ${companyName}`}
        className={styles.companyLogo}
        width={50}
        height={50}
      />
    </div>
  );
};

export default JobLineItem;
