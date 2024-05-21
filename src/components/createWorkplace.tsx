import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@components/ui/dialog";
import { wokrplacesType } from "types/worksplace";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workplaces: wokrplacesType[];
  setWorkplaces: React.Dispatch<React.SetStateAction<wokrplacesType[]>>;
  workPlanceName?: string;
  setNewWorkplaceName?: React.Dispatch<React.SetStateAction<string>>;
  handleRenameWorkplace?: () => void;
}

const CreateWorkPlaceDialog: React.FC<Props> = ({ open, 
  setOpen, workplaces, setWorkplaces, workPlanceName,setNewWorkplaceName ,handleRenameWorkplace }) => {
  const [nameWorkPlace, setNameWorkPlace] = useState("");

  const handleAddWorkplace = () => {
    const newWorkplace: wokrplacesType = {
      id: workplaces.length + 1,
      name: nameWorkPlace,
      folders: [], 
      requisicao: [], 
    };
    setWorkplaces([...workplaces, newWorkplace]);
    localStorage.setItem("workplaces", JSON.stringify([...workplaces, newWorkplace]));
    setOpen(false);
  };
  
  
  useEffect(() => {
  }, [workplaces]);


  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{workPlanceName ? 'Renomear Workplace' : 'Adicionar Novo Workplace'}</DialogTitle>
        </DialogHeader>
            <Input
              type="text"
              placeholder="name"
              onChange={(e) => {
                const newValue = e.target.value;
                if (workPlanceName) {
                  setNewWorkplaceName && setNewWorkplaceName(newValue);
                } else {
                  setNameWorkPlace(newValue);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (workPlanceName) {
                    handleRenameWorkplace && handleRenameWorkplace();
                  } else {
                    handleAddWorkplace();
                  }
                }
              }}
            />

        <div className="flex justify-end mt-4">
          <Button className="mr-2" variant="destructive" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          
          <Button onClick={() => {
          if (workPlanceName) {
            handleRenameWorkplace && handleRenameWorkplace();
          } else {
            handleAddWorkplace();
          }
        }} variant="outline">
          Confirmar
        </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkPlaceDialog;
