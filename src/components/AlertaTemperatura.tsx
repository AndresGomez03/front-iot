"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

export function AlertaTemperatura() {
  // 1. Usar useRef para mantener una única instancia del audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 2. Crear la instancia del audio solo si no existe
    // La ruta debe ser accesible desde la carpeta 'public' de tu proyecto
    if (!audioRef.current) {
      audioRef.current = new Audio("/alerta.mp3");
    }

    // 3. Intentar reproducir el audio
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // El navegador bloqueó la reproducción automática.
        // Esto es esperado si el usuario no ha interactuado con la página.
        console.error("Error al reproducir el audio:", error);
      });
    }

    // 4. Función de limpieza: se ejecuta cuando el componente se desmonta
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();      // Pausa el audio
        audioRef.current.currentTime = 0; // Reinicia el tiempo
      }
    };
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  return (
    <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-3 shadow-md">
      <AlertTriangle className="text-red-600 w-6 h-6" />
      <p className="font-semibold">
        🚨 ¡Alerta! Se ha detectado una temperatura superior a 50 °C.
      </p>
    </div>
  );
}