export const calcPagePagination = (
  page: number,
  limit: number
): { first: number; skip: number } => {
  return {
    first: limit,
    skip: page * limit,
  };
};