import { Input } from "@components/ui/input";
import { useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { PlusCircleIcon, Folder, CircleCheck, CircleX} from "lucide-react"
import { Button } from "@components/ui/button";
import BodyJson from "@components/bodyJson";
import { FoldersType, wokrplacesType } from "types/worksplace";
import AddRequisicao from "@components/addRequisicao";
import { Requisicao } from "types/worksplace";
import ResponseRequest from "@components/responseRequest";
import LinksWorkplace from "@components/LinksWorkplace";
import Folders from "@components/Folders";
import SendRequisicao from "@services/req";
import { ResponsesType } from "types/response";
import SelectBearer from "@components/selectBearer";
import Loading from '@icons/loading-circle.svg'

const WorkplacePage = () => {
  const { idDoWorkplace } = useParams();
  const [method, setMethod] = useState<string>("");
  const [workplace, setWorkplace] = useState<wokrplacesType>({} as wokrplacesType);
  const [open, setOpen] = useState(false);
  const [allWorksPlace, setAllWorksPlace] = useState<wokrplacesType[]>([]);
  const [folder, setFolder] = useState(false);
  const [url ,setUrl] = useState<string>("");
  const [bodyJson, setBodyJson ] = useState<string>("");
  const [response, setResponse] = useState<ResponsesType>({} as ResponsesType);
  const [requisicao, setRequisicao] = useState<Requisicao>({} as Requisicao);
  const [folderReq, setFolderReq] = useState(false)
  const [selectedRequisicao, setSelectedRequisicao] = useState<Requisicao>({} as Requisicao);
  const [loading, setLoading] = useState(false);
useEffect(() => {
},[workplace.tokenAuth,workplace, selectedRequisicao,allWorksPlace])

  useEffect(() => {
    const newRequisicao = {
      name: requisicao.name || '', // Ensure 'name' is not undefined
      body: bodyJson ,
      method: method,
      url: url,
      folder:folderReq
    };
    setRequisicao(newRequisicao); 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, bodyJson,response, method, requisicao.name, allWorksPlace, setAllWorksPlace, folderReq]);



  const sendRequest = async () => {
    setLoading(true)
    try {
      const responseData = await SendRequisicao(requisicao, workplace);
  
      if (responseData) {
        setResponse(responseData);
        setLoading(false)
        if (workplace.requisicao && workplace.requisicao.length > 0 && !folderReq) {
          const { status, result } = responseData;
          console.log(responseData);
          // Encontrar o índice da requisição correspondente
          const requisicaoIndex = workplace.requisicao.findIndex(req => req.url === requisicao.url);
  
          if (requisicaoIndex !== -1) {
            // Atualizar a requisição encontrada
            const updatedRequisicao = {
              ...workplace.requisicao[requisicaoIndex],
              body: bodyJson,
              lastResponse: {result, status}
            };
            console.log(updatedRequisicao)
            setSelectedRequisicao(updatedRequisicao)
            // Atualizar apenas a requisição correspondente no workplace
            const updatedRequisicoes = [...workplace.requisicao];
            updatedRequisicoes[requisicaoIndex] = updatedRequisicao;
  
            const updatedWorkplace = { ...workplace, requisicao: updatedRequisicoes };
            setWorkplace(updatedWorkplace);
  
            localStorage.setItem(
              "workplaces",
              JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp))
            );
          }
        } 
        else if (responseData && folderReq) {
          setResponse(responseData);
          console.log(responseData)

          const { status, result } = responseData;
          setLoading(false)
          // Verificar se a requisição está dentro de alguma pasta
          for (const folder of workplace.folders) {
            if (folder.requisicao) {
              folder.requisicao.forEach((req, index) => {
                if (req.url === requisicao.url) {
                  console.log(req.url)
                  const updatedRequisicao = {
                    ...req,
                    body: bodyJson,
                    lastResponse: { result, status }
                  }
                  console.log(updatedRequisicao)
                  setSelectedRequisicao(updatedRequisicao)
                  const updatedRequisicoes = folder.requisicao ? [...folder.requisicao] : [];
                  updatedRequisicoes[index] = updatedRequisicao;
                  const updatedFolder = { ...folder, requisicao: updatedRequisicoes };
                  const updatedWorkplace = { ...workplace, folders: [...workplace.folders.map(f => f.name === folder.name ? updatedFolder : f)] };
                  setWorkplace(updatedWorkplace);
                  localStorage.setItem(
                    "workplaces",
                    JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp))
                  );
                }
              });
            }
          }
        }
    
    }
    else {
      if (responseData) {
        setResponse(responseData);
        setLoading(false)
      }
    }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };
 
  const addNewRequest = (newReq: Requisicao) => {
    const updatedWorkplace = { ...workplace, requisicao: [...workplace.requisicao, newReq] };
    setWorkplace(updatedWorkplace);
    localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));
  };
  
useEffect(() => {
  const workplacesString = localStorage.getItem("workplaces");
  if (workplacesString) {
    const workplacesArray = JSON.parse(workplacesString);
    setAllWorksPlace(workplacesArray);
  }
}, [])
  
  const addNewFolder = (newFolder: FoldersType) => {
    const updatedWorkplace = { ...workplace, folders: [...workplace.folders, newFolder] };
    setWorkplace(updatedWorkplace);
    localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));
 
  };

  useEffect(() => {
    const workplacesString = localStorage.getItem("workplaces");
    if (workplacesString && idDoWorkplace) {
      const workplacesArray = JSON.parse(workplacesString);
      const foundWorkplace = workplacesArray.find((workplace: { id: number; }) => workplace.id === parseInt(idDoWorkplace));
      setWorkplace(foundWorkplace);
    }
  }, [idDoWorkplace]);

  const getMethodClassname = (method: string) => {
    const map: Record<string, string> = {
      GET: "text-white",
      PUT: "text-yellow-500",
      PATCH: "text-orange-500",
      DELETE: "text-red-500",
      POST: "text-green-500",
    };
    return map[method];
  };
  return (
<div className="md:w-full md:flex md:justify-center md:h-[550px] md:overflow-hidden overflow-auto h-screen" onClick={(e) => e.stopPropagation()}>



   <div className="md:w-fit md:p-4 border md:border-gray-600 md:flex md:flex-col md:h-[550px] md:m-0  h-40 p-4 overflow-auto mb-2" >

        <span className="text-xs text-gray-400 cursor-pointer md:w-fit md:flex hidden"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          window.history.back(); }}> 
          &lt; &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <b>{workplace.name}</b>
        </span> 


        <div className="md:hidden ml-2 flex flex-row items-center justify-between">
          <div>
          <span className="text-xs text-gray-400 cursor-pointer md:w-fit"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          window.history.back(); }}> 
          &lt; &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <b>{workplace.name}</b>
            </span> 
          </div>


          <DropdownMenu>
            <DropdownMenuTrigger >
                <PlusCircleIcon 
                  size={17} className="cursor-pointer md:block hidden" />
                  <Button className="w-full md:hidden">Adicionar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" ">
              <DropdownMenuItem className="text-gray-300  cursor-pointer  " onClick={() => setOpen(true)} >
              <PlusCircleIcon size={13} className="mr-2 " /> Nova requisição

              </DropdownMenuItem>
              <DropdownMenuItem  className="text-gray-300 hidden md:flex cursor-pointer" 
              onClick={() => {
              setOpen(true); 
              setFolder(true)}}>
                <Folder size={13} className="md:mr-2 hidden md:flex"/>    
                Nova pasta
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
           </div>
        <div>
        
        </div>


        <div className="mt-5 w-full flex flex-row items-center justify-between " onClick={(e) => e.stopPropagation()}>
          <Input 
          className="justify-end w-full mx-auto md:border-gray-600 md:border rounded-none h-8 hidden md:block "
          placeholder="Pesquisar..."
          onClick={(e) => e.stopPropagation()} />
        <div className="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger >
                <PlusCircleIcon 
                  size={17} className="cursor-pointer md:block hidden" />
                
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" ">
              <DropdownMenuItem className="text-gray-300  cursor-pointer  " onClick={() => setOpen(true)} >
              <PlusCircleIcon size={13} className="mr-2 " /> Nova requisição

              </DropdownMenuItem>
              <DropdownMenuItem  className="text-gray-300 hidden md:flex cursor-pointer" 
              onClick={() => {
              setOpen(true); 
              setFolder(true)}}>
                <Folder size={13} className="md:mr-2 hidden md:flex"/>    
                Nova pasta
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
           </div>
        </div>
      
        <div className="w-full h-screen overflow-auto md:border mt-3 
        capitalize px-1 text-xs md:border-gray-500 cursor-default " 
        
        onClick={(e) => e.stopPropagation()}>
        {workplace && workplace.folders && workplace.folders.length > 0 && workplace.folders.map((folder, index) => (
          <Folders key={`folder-${index}`} 
          setUrl={setUrl} 
          index={index}
           folder={folder}  
           workplace={workplace}
           setWorkplace={setWorkplace}
           allWorksPlace={allWorksPlace} 
           setBodyJson={setBodyJson}
           setMethod={setMethod}
           setFolderReq={setFolderReq}
           setSelectedRequisicao={setSelectedRequisicao} 
           />
        ))}
          {workplace && workplace.requisicao && workplace.requisicao.length > 0 && workplace.requisicao.map((req, index) => (
            <LinksWorkplace key={`req-${index}`} 
            setUrl={setUrl} 
            setBodyJson={setBodyJson}
            setSelectedRequisicao={setSelectedRequisicao}
            index={index} 
            req={req}
            workplace={workplace}
            setWorkplace={setWorkplace}
            allWorksPlace={allWorksPlace}
            setMethod={setMethod}
            setFolderReq={setFolderReq}
            />
          ))}
          </div>
          </div>
          {/* primieira coluna  */}


      {/* coluna central */}
      <div className="md:w-5/12 p-4 md:border flex flex-col md:border-gray-600 md:items-start md:my-0 my-2">
        <div className="mr-3 mt-2 mb-1 flex flex-row w-full justify-betwee items-center ">
          <div className="hidden md:flex">
          <DropdownMenu>
                <DropdownMenuTrigger
                  className={`cursor-pointer ${getMethodClassname(method)} w-10 mr-1`} >
                  {method}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                <DropdownMenuItem
                    className="text-green-500 cursor-pointer"
                    onClick={() => setMethod("POST")}>
                    POST
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-white cursor-pointer"
                    onClick={() => setMethod("GET")}>
                    GET
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => setMethod("PUT")} >
                    PUT
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-orange-500 cursor-pointer"
                    onClick={() => setMethod("PATCH")} >
                    PATCH
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={() => setMethod("DELETE")}>
                    DELETE
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
        

                <Input 
                className="flex justify-end md:w-10/12 w-full mx-3 border-gray-600   border rounded-none h-8"
                placeholder="http://localhost:3000/" value={url} onChange={(e) => setUrl(e.target.value)}/>
              <Button className="bg-blue-1 text-white w-16" onClick={sendRequest}>{loading ? <img src={Loading} /> : 'Enviar'}</Button>
              </div>

               <div className="text-xs flex md:items-center justify-end md:my-0 my-1">
               Token Automatico: <SelectBearer 
               setworkplace={setWorkplace}
               workplace={workplace}
               allWorksPlace={allWorksPlace}
               />
               {workplace && workplace.tokenAuth  ? 
               <CircleCheck color="#4de40c" size={15} />
              :
              <CircleX color="red" size={15} />}
               </div>

                <div className="w-full my-5 border h-full px-1 py-1  border-gray-600 rounded-sm  ">
                  <BodyJson 
                  setBodyJson={setBodyJson} 
                  bodyJson={bodyJson}
                  requisicao={requisicao}
                   />
                </div>
            </div>
    {/* coluna central */}


      <div className="md:w-5/12 p-4 flex 
      flex-col md:border md:border-gray-600 w-full md:h-auto h-80 overflow-auto">
          <ResponseRequest 
          selectedRequisicao={selectedRequisicao}
          response={response}
          />
      </div>

      <AddRequisicao 
      open={open} 
      setOpen={setOpen} 
      addNewRequest={addNewRequest}
      addNewFolder={addNewFolder}
      folder={folder}
      />
    </div>
  );
};

export default WorkplacePage;
