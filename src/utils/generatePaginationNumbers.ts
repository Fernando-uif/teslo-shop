export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // Si el numero total es  7 o menos , mostraremos todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  // si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3 puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  // si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, puntos suspensivos, las utlimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // si la pagina actual esta en otro lugar medio
  // mostrar la primer pagina , puntos supensivos , pagina actual, mas  vecinos
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
