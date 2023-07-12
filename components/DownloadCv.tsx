"use client";

export const DownloadCvLink = () => {
  return (
    <button
      className="print:hidden bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow self-start inline-block"
      onClick={() => {
        window.print();
      }}
    >
      Print or save
    </button>
  );
};
