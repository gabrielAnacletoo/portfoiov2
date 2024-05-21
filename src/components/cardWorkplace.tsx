import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Ellipsis, Trash, FileOutput, FileInput, FilePenLine, FilePlus2 } from 'lucide-react';
import CreateWorkPlaceDialog from "./createWorkplace";
import { wokrplacesType } from "types/worksplace";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workplaces: wokrplacesType[];
  setWorkplaces: React.Dispatch<React.SetStateAction<wokrplacesType[]>>;
  workplace: wokrplacesType;
}

const CardWorkplace = ({ workplace, setOpen, workplaces, setWorkplaces }: Props) => {
  const [newWorkplaceName, setNewWorkplaceName] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(`/workplace/${workplace.id}`);
    }
  };


  const handleRenameWorkplace = () => {
    const updatedWorkplaces = workplaces.map(item =>
      item.id === workplace.id ? { ...item, name: newWorkplaceName } : item
    );
    setWorkplaces(updatedWorkplaces);
    localStorage.setItem("workplaces", JSON.stringify(updatedWorkplaces));
    setRenameDialogOpen(false); 
  };
  
  const handleDeleteWorkplace = () => {
    const updatedWorkplaces = workplaces.filter(item => item.id !== workplace.id);
    setWorkplaces(updatedWorkplaces);
    localStorage.setItem("workplaces", JSON.stringify(updatedWorkplaces));
    //localStorage.removeItem('');
  };

  return (
    <div className="border-2 rounded-lg border-neutral-400 p-2 w-[300px] h-[150px] cursor-pointer" onClick={handleCardClick}>
      <div className='flex justify-between'>
        <span className='text-xs'>{workplace.name}</span>
        <div className='rounded-full cursor-pointer'>
          <DropdownMenu >
            <DropdownMenuTrigger>
              <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-10">
              <DropdownMenuItem className='w-full items-center justify-between cursor-pointer'  onClick={() => setOpen(true)}>
                <FilePlus2 className='w-[16px] align-top'/>
                &nbsp;Criar Coleção
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='w-full items-center justify-between cursor-pointer'  
                 onClick={() => setRenameDialogOpen(true)}>
                <FilePenLine className='w-[16px] align-top'/>
                &nbsp;Renomear
              </DropdownMenuItem>

              <DropdownMenuItem className='w-full items-center justify-between cursor-pointer'>
                <FileOutput className='w-[16px] align-top' /> 
                &nbsp;Exportar
              </DropdownMenuItem>

              <DropdownMenuItem className='w-full items-center justify-between cursor-pointer'>
                <FileInput className='w-[16px] align-top'/>
                &nbsp;Importar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
             
              <DropdownMenuItem onClick={handleDeleteWorkplace} className='text-red-500 w-full items-center justify-between cursor-pointer'>
                <Trash className='w-[16px] align-top' /> &nbsp;Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {renameDialogOpen && (
        <CreateWorkPlaceDialog 
          open={renameDialogOpen} 
          setOpen={setRenameDialogOpen} 
          setWorkplaces={setWorkplaces}  
          workplaces={workplaces} 
          workPlanceName={workplace.name}
          setNewWorkplaceName={setNewWorkplaceName}
          handleRenameWorkplace={handleRenameWorkplace}
        />
      )}
    </div>
  );
};

export default CardWorkplace;
