import { ChevronDown, Circle, FilePenLine, Folder, PlusCircleIcon, Trash } from 'lucide-react'
import { FoldersType, Requisicao, wokrplacesType } from 'types/worksplace'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible"
import { useState } from 'react'
import AddReqInFolder from '@components/AddReqInFold'
import { Input } from '@components/ui/input'

interface Props {
  folder: FoldersType
  index: number
  setUrl: (url: string) => void
  workplace: wokrplacesType;
  setWorkplace: React.Dispatch<React.SetStateAction<wokrplacesType>>
  allWorksPlace: wokrplacesType[]
  setBodyJson: (bodyJson: string) => void
  setMethod: (method: string) => void
  setFolderReq: (folderReq: boolean) => void
  setSelectedRequisicao: (selectedRequisicao: Requisicao) => void

}

const Folders = ({ folder, index, setUrl, workplace,
  setWorkplace, allWorksPlace, setBodyJson,setFolderReq,
  setMethod, setSelectedRequisicao }: Props) => {
const [open,setOpen] = useState(false)
const [editMode, setEditMode] = useState(false);
const [editedFolderName, setEditedFolderName] = useState(folder.name); 


const handleDeleteFolder = () => {
  const updatedFolders = workplace.folders.filter((f) => f.name !== folder.name);
  const updatedWorkplace = { ...workplace, folders: updatedFolders };
  setWorkplace(updatedWorkplace);
  localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));
};


const handleDeleteRequest = (requestName: string) => {
  const updatedFolders = workplace.folders.map((f) => {
    if (f.name === folder.name) {
      const updatedReqs = f.requisicao?.filter((req) => req.name !== requestName) || [];
      return { ...f, requisicao: updatedReqs };
    }
    return f;
  });

  const updatedWorkplace = { ...workplace, folders: updatedFolders };
  setWorkplace(updatedWorkplace);
  localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));
};


const handleEditFolderName = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    // Atualiza o nome do folder no estado do componente
    const updatedFolders = workplace.folders.map((f) => {
      if (f.name === folder.name) {
        return { ...f, name: editedFolderName };
      }
      return f;
    });
    const updatedWorkplace = { ...workplace, folders: updatedFolders };
    setWorkplace(updatedWorkplace);
    setEditMode(false); 
  }
};  



  return (
    <>
      <div key={`folder-${index}`} className='flex flex-row w-full items-center '>

        <div className="flex flex-row w-full items-center">
          <Collapsible>
            <CollapsibleTrigger className='flex flex-row w-[180px] mt-1 items-center'> 
            <Folder size={13} color="yellow" className="mr-2" /> 
            <span className='capitalize'>
            {editMode ? (
              <Input className='bg-dark-1 text-white h-5'
              autoFocus
              type="text"
              value={editedFolderName}
              onKeyDown={handleEditFolderName}
              onChange={(e) => {
                setEditedFolderName(e.target.value);
                e.stopPropagation();
              }}
            />

   
              ) : (
                <span className='capitalize'>{folder.name}</span>
              )}
            </span>

            <div className=' ml-auto'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChevronDown color='gray' size={14} className='cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
              <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={() => setOpen(!open)}>
                <span className="mr-2"><PlusCircleIcon size={13} /></span>
                Adicionar
              </DropdownMenuItem>

                <DropdownMenuItem className="flex justify-between cursor-pointer" onClick={() => setEditMode(true)}>
                <FilePenLine  size={13} className="mr-2" />
                Renomear</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteFolder} className="flex justify-between text-red-600 cursor-pointer">
                <span><Trash size={13} className="mr-2"  /></span>
                Deletar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            </CollapsibleTrigger>

            <CollapsibleContent >
              {/* Renderiza os itens da pasta */}
              {folder.requisicao && folder.requisicao.length > 0 && folder.requisicao.map((req: Requisicao, reqIndex: number) => (
                <div key={`folder-${index}-req-${reqIndex}`} className='ml-2 items-center flex w-full'>
                    <Circle
                  size={10}
                  color={req.method === "POST" ? "green" : req.method === "DELETE" ? "red" : req.method === "PUT" ? "yellow" : req.method === "PATCH" ? "orange" : "gray"}
                  className="mr-1"/>
                  <div className='flex flex-row w-full justify-between'>
                  <span className="mb-1 cursor-pointer" onClick={() => {
            setUrl(req.url);
            setFolderReq(false);
            setFolderReq(true);
            if (req.body != null) {
              setBodyJson(req.body);
            } else {
              setBodyJson('');
            }
            setMethod(req.method);
            setSelectedRequisicao(req);
          }}>
                    {req.name.length > 15 ? req.name.substring(0, 15) + '...' : req.name}
                  </span>
                  <div>
                <DropdownMenu>
                <DropdownMenuTrigger>
                <ChevronDown color='gray' size={14} className='cursor-pointer' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDeleteRequest(req.name)} className="flex justify-between text-red-600 cursor-pointer">
                <Trash size={13} className="mr-2"  />Deletar</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                  </div>
                </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

        </div>
      </div>

      <AddReqInFolder 
      open={open} 
      setOpen={setOpen} 
      workplace={workplace}
      folder={folder.name}
      setWorkplace={setWorkplace}
      allWorksPlace={allWorksPlace}
      />
    </>
  )
}

export default Folders
