
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddMaterialDialogProps {
  onClose: () => void;
}

const AddMaterialDialog = ({ onClose }: AddMaterialDialogProps) => {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Adicionar Novo Material</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <p className="text-muted-foreground text-sm italic">
          Este recurso está em desenvolvimento. A criação de materiais será implementada em breve.
        </p>
        {/* Campos do formulário seriam adicionados aqui em uma implementação real */}
      </div>
    </DialogContent>
  );
};

export default AddMaterialDialog;
