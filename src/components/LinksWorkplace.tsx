import React from "react";
import { useState } from "react";
import { Requisicao, wokrplacesType } from "types/worksplace";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { ChevronDown, Trash } from "lucide-react";

interface Props {
  setUrl: (url: string) => void;
  index: number;
  req: Requisicao;
  setBodyJson: (bodyJson: string) => void;
  setSelectedRequisicao: (selectedRequisicao: Requisicao) => void
  workplace: wokrplacesType;
  setWorkplace: React.Dispatch<React.SetStateAction<wokrplacesType>>;
  allWorksPlace: wokrplacesType[];
  setMethod: (method: string) => void;
  setFolderReq: (folderReq: boolean) => void;
}

const LinksWorkplace = ({
  setUrl,
  index,
  req,
  setBodyJson,
  workplace,
  setWorkplace,
  allWorksPlace,
  setMethod,
  setFolderReq,
  setSelectedRequisicao
}: Props) => {
  const [localWorkplace, setLocalWorkplace] = useState<wokrplacesType>(workplace);

  const handleDeleteRequest = (requestName: string) => {
    // Filtrar a requisição a ser removida
    const updatedRequisicao = localWorkplace.requisicao.filter(f => f.name !== requestName);

    // Atualizar o objeto workplace com a nova lista de requisições
    const updatedWorkplace = { ...localWorkplace, requisicao: updatedRequisicao };

    // Atualizar o estado do workplace local
    setLocalWorkplace(updatedWorkplace);

    // Atualizar o estado global do workplace
    setWorkplace(updatedWorkplace);

    // Atualizar o localStorage
    localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));
  };

  return (
    <>
      <div key={`req-${index}`} className="mt-1">
        <div className="flex flex-row w-full items-center">
          <span className={`w-3 h-3 rounded-full ${
              req.method === "POST"
              ? "bg-green-500" 
              : req.method === "DELETE"
                ? "bg-red-500" 
                : req.method === "PUT"
                    ? "bg-yellow-500" 
                : req.method === "PATCH"
                    ? "bg-orange-500" 
                : "bg-white" 
              } text-white`} >
          </span>
          <span className="mx-2 cursor-pointer" onClick={() => {
            setUrl(req.url);
            setFolderReq(false);
            // Verifica se req.body está definido e não é nulo
            if (req.body != null) {
              setBodyJson(req.body);
            } else {
              // Se req.body for null ou undefined, define o corpo como vazio
              setBodyJson('');
            }
            setMethod(req.method);
            setSelectedRequisicao(req);
          }}>
            {req.name.length > 15 ? req.name.substring(0, 15) + '...' : req.name}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown color='gray' size={14} className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDeleteRequest(req.name)} className="flex justify-between text-red-600 cursor-pointer">
                <Trash size={13} className="mr-2" />Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default LinksWorkplace;
