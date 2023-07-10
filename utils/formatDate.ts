export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  })
}