"use client";

export const ClientDate = ({ date }: { date: string }) => {
  return (
    <>
      {new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
      })}
    </>
  );
};
