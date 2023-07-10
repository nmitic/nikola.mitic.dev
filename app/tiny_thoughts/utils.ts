export const calcPagePagination = (
  page: number,
  limit: number = 3
): { first: number; skip: number } => {
  return {
    first: limit,
    skip: page * limit,
  };
};