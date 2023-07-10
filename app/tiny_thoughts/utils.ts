export const calcPagePagination = (
  page: number,
  limit: number = 6
): { first: number; skip: number } => {
  return {
    first: limit,
    skip: page * limit,
  };
};