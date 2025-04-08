"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Target, User } from "lucide-react";
import { ProfileTab } from "./profile-tab";
import { SimulatorTab } from "./simulator-tab";
import { ActionPlanTab } from "./action-plan-tab";
import logo from "../public/logo.png";

export function MetasMonthlyAssistant() {
  const [socioNombre, setSocioNombre] = useState("Socio A");
  const [mes, setMes] = useState("Febrero");
  const [ticketPromedio, setTicketPromedio] = useState(850);
  const [valorUSD, setValorUSD] = useState(1055);
  const [nivelActual, setNivelActual] = useState(10);
  const [producto, setProducto] = useState("Producto A");
  const [objetivo, setObjetivo] = useState(0);
  const [tengoQueVender, settengoQueVender] = useState(0);
  const [volumenCarrera, setVolumenCarrera] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [nuevosDatos, setNuevosDatos] = useState(0);
  const [minPresentacionesMes, setMinPresentacionesMes] = useState(0);
  const [minPresentacionesSem, setMinPresentacionesSem] = useState(1);
  const [tasaDeCierre, setTasaDeCierre] = useState(0.35);

  const fecha = new Date().toLocaleDateString();
  const capacitacionMinima = "20Hs semanales";

  const handleNivelActual = (nivel: number) => {
    setNivelActual(nivel);
    if (nivel === 10) {
      setTasaDeCierre(0.3);
    } else if (nivel === 15) {
      setTasaDeCierre(0.35);
    } else {
      setTasaDeCierre(0.5);
    }
  };

  return (
    <Card className="border shadow-lg overflow-hidden bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Asistente de Metas Mensuales
            </CardTitle>
            <p className="text-blue-100 mt-1">
              Planifica y alcanza tus objetivos de ventas
            </p>
          </div>
          <div className="rounded-full bg-white/20 p-2">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-100">
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-blue-50"
          >
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="simulator"
            className="data-[state=active]:bg-blue-50"
            disabled={ticketPromedio === 0 || valorUSD === 0}
          >
            <BarChart className="w-4 h-4 mr-2" />
            Simulador
          </TabsTrigger>
          <TabsTrigger
            value="action"
            className="data-[state=active]:bg-blue-50"
            disabled={ticketPromedio === 0 || valorUSD === 0}
          >
            <Target className="w-4 h-4 mr-2" />
            Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <CardContent className="p-4">
            <ProfileTab
              socioNombre={socioNombre}
              setSocioNombre={setSocioNombre}
              mes={mes}
              setMes={setMes}
              ticketPromedio={ticketPromedio}
              setTicketPromedio={setTicketPromedio}
              valorUSD={valorUSD}
              setValorUSD={setValorUSD}
              nivelActual={nivelActual}
              handleNivelActual={handleNivelActual}
            />
          </CardContent>
        </TabsContent>

        <TabsContent value="simulator">
          <CardContent className="p-4">
            <SimulatorTab
              producto={producto}
              setProducto={setProducto}
              objetivo={objetivo}
              setObjetivo={setObjetivo}
              tengoQueVender={tengoQueVender}
              setTengoQueVender={settengoQueVender}
              volumenCarrera={volumenCarrera}
              setVolumentCarrera={setVolumenCarrera}
              totalVentas={totalVentas}
              setTotalVentas={setTotalVentas}
              nivelActual={nivelActual}
              valorUSD={valorUSD}
              ticketPromedio={ticketPromedio}
            />
          </CardContent>
        </TabsContent>

        <TabsContent value="action">
          <ActionPlanTab
            fecha={fecha}
            nuevosDatos={nuevosDatos}
            setNuevosDatos={setNuevosDatos}
            minPresentacionesMes={minPresentacionesMes}
            setMinPresentacionesMes={setMinPresentacionesMes}
            minPresentacionesSem={minPresentacionesSem}
            setMinPresentacionesSem={setMinPresentacionesSem}
            capacitacionMinima={capacitacionMinima}
            totalVentas={totalVentas}
            tasaDeCierre={tasaDeCierre}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
