"use client";

import React, { useRef, useState } from "react";
import { Award, BookOpen, Target } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileOption } from "@/components/types";
import { toast } from "sonner";

interface ActionPlanTabProps {
  fecha: string;
  nuevosDatos: number;
  setNuevosDatos: (value: number) => void;
  minPresentacionesMes: number;
  setMinPresentacionesMes: (value: number) => void;
  minPresentacionesSem: number;
  setMinPresentacionesSem: (value: number) => void;
  capacitacionMinima: string;
  totalVentas: number;
  tasaDeCierre: number;
}

export function ActionPlanTab({
  fecha,
  nuevosDatos,
  setNuevosDatos,
  minPresentacionesMes,
  setMinPresentacionesMes,
  minPresentacionesSem,
  setMinPresentacionesSem,
  capacitacionMinima,
  totalVentas,
  tasaDeCierre,
}: ActionPlanTabProps) {
  const [supervisorSignature, setSupervisorSignature] = useState<string | null>(
    null,
  );
  const [emprendedorSignature, setEmprendedorSignature] = useState<
    string | null
  >(null);
  const [currentSigner, setCurrentSigner] = useState<ProfileOption | null>(
    null,
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signature = canvas.toDataURL();
      if (currentSigner === ProfileOption.Supervisor) {
        setSupervisorSignature(signature);
      } else if (currentSigner === ProfileOption.Emprendedor) {
        setEmprendedorSignature(signature);
      }
      setIsEditing(false);
    }
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";

      let clientX, clientY;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-indigo-800">
            TU PLAN DE ACCIÓN desde HOY
          </h3>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm font-medium">
            {fecha}
          </span>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Target className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <Label
                  htmlFor="nuevos-datos"
                  className="font-medium text-gray-700"
                >
                  Nuevos Datos a Prospectar
                </Label>
                <div className="text-xl font-bold">
                  ${Math.round(totalVentas * 6)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Award className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label
                    htmlFor="pres-mes"
                    className="font-medium text-gray-700"
                  >
                    Mínimo Presentaciones x Mes
                  </Label>
                  <div className="text-xl font-bold">
                    ${Math.round(totalVentas / tasaDeCierre)}
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="pres-sem"
                    className="font-medium text-gray-700"
                  >
                    Mínimo Presentaciones x Sem.
                  </Label>
                  <div className="text-xl font-bold">
                    ${Math.round(totalVentas / tasaDeCierre / 25)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <Label className="font-medium text-gray-700">
                  Capacitación Mínima Sugerida
                </Label>
                <p className="text-sm text-gray-500">
                  entre Campus Virtual y Oficina
                </p>
                <div className="mt-2 bg-blue-50 p-2 rounded text-center font-medium text-blue-700">
                  {capacitacionMinima}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 border-t rounded-b-lg">
        <div className="grid grid-cols-2 gap-4">
          <SignatureField
            label="Firma Supervisor"
            signature={supervisorSignature}
            onSign={() => {
              setCurrentSigner(ProfileOption.Supervisor);
              setIsEditing(true);
            }}
            canvasRef={canvasRef}
            startDrawing={startDrawing}
            stopDrawing={stopDrawing}
            saveSignature={saveSignature}
            draw={draw}
            clearCanvas={clearCanvas}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <SignatureField
            label="Firma Emprendedor"
            signature={emprendedorSignature}
            onSign={() => {
              setCurrentSigner(ProfileOption.Emprendedor);
              setIsEditing(true);
            }}
            canvasRef={canvasRef}
            startDrawing={startDrawing}
            stopDrawing={stopDrawing}
            saveSignature={saveSignature}
            draw={draw}
            clearCanvas={clearCanvas}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600"
          disabled={!supervisorSignature || !emprendedorSignature}
          onClick={() => {
            toast.success("Plan de Acción guardado");
          }}
        >
          Guardar Plan de Acción
        </Button>
      </div>
    </div>
  );
}

interface SignatureFieldProps {
  label: string;
  signature: string | null;
  onSign: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startDrawing: (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => void;
  stopDrawing: () => void;
  saveSignature: () => void;
  draw: (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => void;
  clearCanvas: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

function SignatureField({
  label,
  signature,
  onSign,
  canvasRef,
  startDrawing,
  stopDrawing,
  saveSignature,
  draw,
  clearCanvas,
  isEditing,
  setIsEditing,
}: SignatureFieldProps) {
  return (
    <div className="space-y-4">
      <Label className="text-xs text-gray-500">{label}</Label>
      {signature && !isEditing ? (
        <div
          className="d-flex flex-col gap-2 h-20 border rounded flex items-center justify-center"
          onClick={onSign}
        >
          <img
            src={signature || "/placeholder.svg"}
            alt={label}
            className="max-h-full"
          />
        </div>
      ) : (
        <Dialog open={isEditing} onOpenChange={(open) => setIsEditing(open)}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full" onClick={onSign}>
              Firmar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{label}</DialogTitle>
            </DialogHeader>
            <div className="border rounded">
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="w-full touch-none"
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={clearCanvas}>
                Limpiar
              </Button>
              <Button onClick={saveSignature}>Guardar Firma</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
