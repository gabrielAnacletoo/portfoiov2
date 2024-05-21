import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@components/ui/dialog"
import { Button } from "@components/ui/button";
import { Requisicao, FoldersType } from "types/worksplace";
import { useState } from 'react'
import { Input } from "@components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"



interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addNewRequest: (newReq: Requisicao) => void;
    addNewFolder: (newFolder: FoldersType) => void;
    folder: boolean
  }
  
const AddRequisicao = ({open, setOpen, addNewRequest, addNewFolder, folder}: Props) => {
    const [requisicao, setRequisicao] = useState<Requisicao>({
        name: "",
        method: "",
        url: "",
      });
const [newFolder, setNewFolder ] = useState<FoldersType>({
  name: "",
  requisicao: [],
})

return (
    <>
   <Dialog  open={open}>
    <DialogContent >
        <DialogHeader >
        <DialogTitle>{folder ? 'Nova pasta' : 'Nova Requisição'}</DialogTitle>
        <DialogDescription>
          {folder ? 
            <Input placeholder="Nome da pasta" value={newFolder.name} onChange={(e) => setNewFolder({...newFolder, name: e.target.value})}/>
                :
            <>
        <Input placeholder="URL" value={requisicao.url} onChange={(e) => setRequisicao({...requisicao, url: e.target.value})}/>
            <div className="flex flex-row justify-between w-full mt-3">
                <Input className="w-2/5" placeholder="Nome da Requisição" value={requisicao.name} onChange={(e) => setRequisicao({...requisicao, name: e.target.value})}/>
              
                  <Select onValueChange={(e) => setRequisicao({...requisicao, method: e})}>
                  <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET" >GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>

                </SelectContent>
              </Select>
            </div>
        </>
        }
        </DialogDescription>
        </DialogHeader> 
        <div className="flex flex-row justify-between w-full pb-5">
        <Button variant="destructive" onClick={() => setOpen(false)}>Cancelar</Button>

        <Button variant="default" onClick={
          () => {
            setOpen(false); 
            folder ? addNewFolder(newFolder) : addNewRequest(requisicao)}}>
              Confirmar</Button>
        </div>
    </DialogContent>
</Dialog>
    </>
  )
}

export default AddRequisicao