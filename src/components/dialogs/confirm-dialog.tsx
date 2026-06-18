import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;

    confirmLabel?: string;
    cancelLabel?: string;

    loading?: boolean;

    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Processando..." : confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
