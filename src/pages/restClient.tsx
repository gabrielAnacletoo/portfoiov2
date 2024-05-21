import CardWorkplace from "@components/cardWorkplace";
import { useEffect, useState } from "react";
import CreateWorkPlaceDialog from "@components/createWorkplace";
import { wokrplacesType } from "types/worksplace";

const RestClient = () => {
  const [workplaces, setWorkplaces] = useState<wokrplacesType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const workPlacesLocal = localStorage.getItem("workplaces");
    if(workPlacesLocal){
      setWorkplaces(JSON.parse(workPlacesLocal || "[]"));
    }
  }, []);

  useEffect(() => {
  }, [workplaces]);

  return (
    <div className="flex w-full h-screen overflow-auto  mx-auto">
      <div className="flex flex-row w-full flex-wrap gap-4 justify-center items-start">
        {workplaces.length === 0 ? (
          <div className="">
            <button onClick={() => setOpen(true)} className="border border-gray-400 rounded-lg p-2 w-[250px] h-[170px]">
              Adicionar Novo Workplace
            </button>
          </div>
        ) : (
          workplaces.map((workplace, index) => (
            <div key={index} className="">
              <CardWorkplace workplace={workplace} 
              open={open} 
              setOpen={setOpen} 
              setWorkplaces={setWorkplaces}  
              workplaces={workplaces} />
            </div>
          ))
        )}
      </div>
      <CreateWorkPlaceDialog open={open} 
      setOpen={setOpen} 
      setWorkplaces={setWorkplaces}  
      workplaces={workplaces} 
  
      />
    </div>
  );
};

export default RestClient;
