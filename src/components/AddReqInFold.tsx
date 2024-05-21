import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@components/ui/dialog"
import { Button } from "@components/ui/button";
import { Requisicao, wokrplacesType } from "types/worksplace";
import { useState } from 'react'
import { Input } from "@components/ui/input";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workplace: wokrplacesType;
    folder: string;
    setWorkplace: React.Dispatch<React.SetStateAction<wokrplacesType>>
    allWorksPlace: wokrplacesType[]
  }
  
const AddReqInFolder = ({open, setOpen,workplace,folder, setWorkplace, allWorksPlace }: Props) => {
    const [requisicao, setRequisicao] = useState<Requisicao>({
        name: "",
        method: "",
        url: "",
      });
      const handleConfirm = () => {
        const targetFolderIndex = workplace.folders.findIndex((f) => f.name === folder);
        if (targetFolderIndex !== -1) {
          const updatedFolders = [...workplace.folders];
          updatedFolders[targetFolderIndex].requisicao = [...updatedFolders[targetFolderIndex].requisicao || [], requisicao];
          const updatedWorkplace = { ...workplace, folders: updatedFolders };
          setWorkplace(updatedWorkplace);
          localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));
        }
      };
  return (
    <>
   <Dialog  open={open}>
    <DialogContent >
        <DialogHeader >
        <DialogTitle>Nova Requisição</DialogTitle>
        <DialogDescription>
        <Input placeholder="URL" value={requisicao.url} onChange={(e) => setRequisicao({...requisicao, url: e.target.value})}/>
            <div className="flex flex-row justify-between w-full mt-3">
                <Input className="w-2/5" placeholder="Nome da Requisição" value={requisicao.name} onChange={(e) => setRequisicao({...requisicao, name: e.target.value})}/>
                <select className="w-2/5" defaultValue={'Método'} onChange={(e) => setRequisicao({...requisicao, method: e.target.value})}>
                    <option value="Método" hidden>Método</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PATCH">PATCH</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>

    
        </DialogDescription>
        </DialogHeader> 
        <div className="flex flex-row justify-between w-full pb-5">
        <Button variant="destructive" onClick={() => setOpen(false)}>Cancelar</Button>

        <Button variant="default" onClick={
          () => {
            setOpen(false); 
            handleConfirm()
          }}
           > Confirmar</Button>
        </div>
    </DialogContent>
</Dialog>
    </>
  )
}

export default AddReqInFolder