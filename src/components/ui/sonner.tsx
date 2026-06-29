import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const TOAST_ICONS = {
  success: <CircleCheckIcon className="size-8 text-white" />,
  info: <InfoIcon className="size-8 text-white" />,
  warning: <TriangleAlertIcon className="size-8 text-white" />,
  error: <OctagonXIcon className="size-8 text-white" />,
  loading: <Loader2Icon className="size-8 animate-spin text-white" />,
};

/*
const OldToaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      closeButton
      duration={Number.POSITIVE_INFINITY}
      expand
      className="toaster group [&_[data-sonner-toast]]:min-h-14 [&_[data-sonner-toast]]:rounded-xl [&_[data-sonner-toast]]:border-2 [&_[data-sonner-toast]]:shadow-2xl [&_[data-sonner-toast]]:px-4 [&_[data-sonner-toast]]:py-3"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--foreground) / 0.2)",
          "--border-radius": "0.9rem",
          "--success-bg": "hsl(142 72% 32%)",
          "--success-text": "hsl(0 0% 100%)",
          "--error-bg": "hsl(0 78% 50%)",
          "--error-text": "hsl(0 0% 100%)",
          "--warning-bg": "hsl(35 95% 50%)",
          "--warning-text": "hsl(0 0% 100%)",
          "--info-bg": "hsl(221 83% 44%)",
          "--info-text": "hsl(0 0% 100%)",
          "--success-border": "hsl(142 72% 32%)",
          "--error-border": "hsl(0 78% 50%)",
          "--warning-border": "hsl(35 95% 50%)",
          "--info-border": "hsl(221 83% 44%)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
*/
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-center"
      closeButton
      theme={theme as ToasterProps["theme"]}
      duration={Number.POSITIVE_INFINITY}
      expand
      richColors
      visibleToasts={5}
      className="toaster group 
        [&_[data-sonner-toast]]:min-h-20 
        [&_[data-sonner-toast]]:w-[min(92vw,480px)] 
        [&_[data-sonner-toast]]:border 
        [&_[data-sonner-toast]]:backdrop-blur-md
        [&_[data-sonner-toast]]:flex 
        [&_[data-sonner-toast]]:items-start 
        [&_[data-sonner-toast]]:gap-4
        [&_[data-icon]]:flex-shrink-0 
        [&_[data-icon]]:mt-0.5
        [&_[data-icon]+[data-content]]:ml-3

        [&_[data-content]]:flex-1
        [&_[data-content]]:text-base
        
        /* CORREÇÃO DO BOTÃO FECHAR (Forçando com o modificador !) */
        [&_[data-close-button]]:!size-7
        [&_[data-close-button]]:!top-1
        [&_[data-close-button]]:!right-1
        [&_[data-close-button]_svg]:!size-5"
      icons={TOAST_ICONS}
      toastOptions={{
        style: {
          "--normal-bg": "hsl(var(--card))",
          "--normal-text": "hsl(var(--card-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--border-radius": "1rem",

          // Cores de fundo (Alertas)
          "--success-bg": "hsl(142 72% 28%)",
          "--error-bg": "hsl(0 78% 50%)",
          "--warning-bg": "hsl(35 95% 50%)",
          "--info-bg": "hsl(221 83% 44%)",

          // Cores de texto brancas para contraste com richColors
          "--success-text": "hsl(0 0% 100%)",
          "--error-text": "hsl(0 0% 100%)",
          "--warning-text": "hsl(0 0% 100%)",
          "--info-text": "hsl(0 0% 100%)",

          // Bordas espelhando a cor de fundo
          "--success-border": "hsl(142 72% 28%)",
          "--error-border": "hsl(0 78% 50%)",
          "--warning-border": "hsl(35 95% 50%)",
          "--info-border": "hsl(221 83% 44%)",
        } as React.CSSProperties
      }}
      {...props} // Movido para o final para não anular suas configurações padrão acima
    />
  )
}


export { Toaster }

/*
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      closeButton
      duration={Number.POSITIVE_INFINITY}
      expand
      richColors
      visibleToasts={5}
      className="toaster group [&_[data-sonner-toast]]:min-h-20 [&_[data-sonner-toast]]:w-[min(92vw,480px)] [&_[data-sonner-toast]]:rounded-2xl [&_[data-sonner-toast]]:border [&_[data-sonner-toast]]:shadow-[0_24px_80px_rgba(0,0,0,0.35)] [&_[data-sonner-toast]]:px-5 [&_[data-sonner-toast]]:py-4 [&_[data-sonner-toast]]:backdrop-blur-md"
      icons={{
        success: <CircleCheckIcon className="size-8" />,
        info: <InfoIcon className="size-8" />,
        warning: <TriangleAlertIcon className="size-8" />,
        error: <OctagonXIcon className="size-8" />,
        loading: <Loader2Icon className="size-8 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--card))",
          "--normal-text": "hsl(var(--card-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--border-radius": "1rem",
          "--success-bg": "hsl(142 72% 28%)",
          "--success-text": "hsl(0 0% 100%)",
          "--error-bg": "hsl(0 78% 50%)",
          "--error-text": "hsl(0 0% 100%)",
          "--warning-bg": "hsl(35 95% 50%)",
          "--warning-text": "hsl(0 0% 100%)",
          "--info-bg": "hsl(221 83% 44%)",
          "--info-text": "hsl(0 0% 100%)",
          "--success-border": "hsl(142 72% 28%)",
          "--error-border": "hsl(0 78% 50%)",
          "--warning-border": "hsl(35 95% 50%)",
          "--info-border": "hsl(221 83% 44%)",
        } as React.CSSProperties
      }
      {...props}
    />
*/