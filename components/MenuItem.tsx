"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const MenuItem = ({ href, text }: { href: string; text: string }) => {
  return (
    <motion.li
      initial={{ opacity: 0, scale: 1.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="group relative"
    >
      <Link
        href={href}
        className="text-6xl group-hover:translate-x-8 transition w-full block group-hover:underline"
      >
        {text}
      </Link>
    </motion.li>
  );
};

export default MenuItem;
