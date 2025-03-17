"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateGananciaNeta,
  calculateTengoQueVender,
  calculateTotalVentas,
  calculateVolumenEnCarrera,
  getProductNames,
} from "@/components/utils";
import { useEffect } from "react";
import { toast } from "sonner";

interface SimulatorTabProps {
  producto: string;
  setProducto: (value: string) => void;
  objetivo: number;
  setObjetivo: (value: number) => void;
  tengoQueVender: number;
  setTengoQueVender: (value: number) => void;
  volumenCarrera: number;
  setVolumentCarrera: (value: number) => void;
  totalVentas: number;
  setTotalVentas: (value: number) => void;
  nivelActual: number;
  valorUSD: number;
  ticketPromedio: number;
}

export function SimulatorTab({
  producto,
  setProducto,
  objetivo,
  setObjetivo,
  tengoQueVender,
  setTengoQueVender,
  volumenCarrera,
  setVolumentCarrera,
  totalVentas,
  setTotalVentas,
  nivelActual,
  valorUSD,
  ticketPromedio,
}: SimulatorTabProps) {
  const productNames = getProductNames();

  useEffect(() => {
    const venta = calculateTengoQueVender(objetivo, nivelActual);
    setTengoQueVender(venta);
  }, [objetivo, nivelActual]);

  useEffect(() => {
    const volumen = calculateVolumenEnCarrera(tengoQueVender, valorUSD);

    setVolumentCarrera(volumen);
  }, [tengoQueVender, valorUSD]);

  useEffect(() => {
    const ventas = calculateTotalVentas(volumenCarrera, ticketPromedio);
    setTotalVentas(ventas);
  }, [ticketPromedio, volumenCarrera]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Simulador de Venta Personal
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="producto" className="font-medium">
              Seleccione un Ticket de Venta como ejemplo
            </Label>
            <Select value={producto} onValueChange={setProducto}>
              <SelectTrigger className="bg-white border-blue-200">
                <SelectValue placeholder="Seleccionar producto" />
              </SelectTrigger>
              <SelectContent>
                {productNames.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="text-gray-700">Tu Ganancia Neta Hoy:</div>
          <div className="text-2xl font-bold text-green-600">
            ${calculateGananciaNeta(producto, nivelActual)}
          </div>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-center">OBJETIVO</h3>
        <p className="text-blue-100 text-center mb-4">
          ¿Cuánto quiero Ganar este mes en mi Venta personal?
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="objetivo" className="text-blue-100">
              Ingrese su objetivo ($)
            </Label>
            <Input
              id="objetivo"
              type="number"
              value={objetivo}
              onChange={(e) => setObjetivo(Number(e.target.value))}
              className="bg-blue-800 border-blue-700 text-white placeholder:text-blue-300"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-blue-800 p-3 rounded-lg">
              <div className="text-blue-200 text-sm">Tengo que Vender</div>
              <div className="text-xl font-bold">${tengoQueVender}</div>
            </div>
            <div className="bg-blue-800 p-3 rounded-lg">
              <div className="text-blue-200 text-sm">Volumen en carrera</div>
              <div className="text-xl font-bold">{volumenCarrera}usd</div>
            </div>
          </div>

          <div className="bg-blue-800 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-blue-200">Total de Ventas en el Mes</div>
              <div className="text-xl font-bold">{totalVentas}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
