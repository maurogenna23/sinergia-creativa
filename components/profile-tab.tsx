"use client";

import React, { useEffect } from "react";
import { Calendar, DollarSign, TrendingUp, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ProfileTabProps {
  socioNombre: string;
  setSocioNombre: (value: string) => void;
  mes: string;
  setMes: (value: string) => void;
  ticketPromedio: number;
  setTicketPromedio: (value: number) => void;
  valorUSD: number;
  setValorUSD: (value: number) => void;
  nivelActual: number;
  handleNivelActual: (value: number) => void;
}

export function ProfileTab({
  socioNombre,
  setSocioNombre,
  mes,
  setMes,
  ticketPromedio,
  setTicketPromedio,
  valorUSD,
  setValorUSD,
  nivelActual,
  handleNivelActual,
}: ProfileTabProps) {
  useEffect(() => {
    if (ticketPromedio === 0) {
      toast.warning("El ticket promedio no puede ser 0");
    }
    if (valorUSD === 0) {
      toast.warning("El valor USD no puede ser 0");
    }
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <User className="w-5 h-5 text-blue-500 mr-2" />
          <Label htmlFor="socio" className="font-medium">
            Nombre de Socio/a
          </Label>
        </div>
        <Input
          id="socio"
          value={socioNombre}
          onChange={(e) => setSocioNombre(e.target.value)}
          className="border-blue-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-blue-500 mr-2" />
          <Label htmlFor="mes" className="font-medium">
            Mes
          </Label>
        </div>
        <Select value={mes} onValueChange={setMes}>
          <SelectTrigger className="border-blue-200 focus:border-blue-500">
            <SelectValue placeholder="Seleccionar mes" />
          </SelectTrigger>
          <SelectContent>
            {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"].map(
              (m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
          <Label htmlFor="ticket" className="font-medium">
            Mi Ticket Promedio en USD
          </Label>
        </div>
        <Input
          id="ticket"
          type="number"
          value={ticketPromedio}
          onChange={(e) => setTicketPromedio(Number(e.target.value))}
          className="border-blue-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
          <Label htmlFor="valor" className="font-medium">
            Valor USD
          </Label>
        </div>
        <Input
          id="valor"
          type="number"
          value={valorUSD}
          onChange={(e) => setValorUSD(Number(e.target.value))}
          className="border-blue-200 focus:border-blue-500"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="text-blue-700 font-bold">Nivel Actual</div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue
                className="font-bold text-blue-700"
                placeholder={`${nivelActual} % `}
              />
            </SelectTrigger>
            <SelectContent>
              {[10, 15, 20, 35, 40].map((nivel) => (
                <SelectItem
                  key={nivel}
                  value={nivel.toString()}
                  onClick={() => handleNivelActual(nivel)}
                >
                  {nivel}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
