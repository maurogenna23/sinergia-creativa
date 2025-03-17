export const ValoresProductos = {
  "Producto A": 10000,
  "Producto B": 20000,
  "Producto C": 30000,
  "Producto D": 40000,
  "Producto E": 50000,
  "Producto F": 60000,
  "Producto G": 70000,
  "Producto H": 80000,
};

export type ProductoKey = keyof typeof ValoresProductos;

export const getProductNames = () => Object.keys(ValoresProductos);

export const calculateGananciaNeta = (
  producto: ProductoKey,
  nivelActual: number,
) => {
  const valorProducto = ValoresProductos[producto];
  return ((valorProducto / 1.21) * (nivelActual / 100)).toFixed(0);
};

export const calculateTengoQueVender = (valor: number, nivelActual: number) => {
  return Math.round(valor * 1.21 * nivelActual);
};

export const calculateVolumenEnCarrera = (
  tengoQueVender: number,
  valorUSD: number,
) => {
  return Math.round(tengoQueVender / valorUSD);
};

export const calculateTotalVentas = (
  volumenEnCarrera: number,
  ticketPromedio: number,
) => {
  return Math.round(volumenEnCarrera / ticketPromedio);
};
