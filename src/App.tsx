import { Router } from "@/app/router/router";

export function App() {
  return <Router />;
}

/*
//import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ComponentTest() {
  const [contador, setContador] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-50 text-zinc-900 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Laboratório de Componentes</h1>
        <p className="text-zinc-500">Valide se o Shadcn, React 19 e Tailwind v4 estão integrados.</p>
      </div>

      <div className="p-6 bg-white border border-zinc-200 rounded-xl shadow-sm w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Variantes do Botão</h2>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="default" onClick={() => setContador(contador + 1)}>
            Padrão ({contador})
          </Button>
          
          <Button variant="destructive" onClick={() => setContador(0)}>
            Resetar
          </Button>
          
          <Button variant="outline">Contorno</Button>
          <Button variant="ghost">Fantasma</Button>
        </div>
      </div>

    </div>
  )
}
*/