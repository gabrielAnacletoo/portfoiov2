import React, { useState } from "react";
import { wokrplacesType, Requisicao } from "types/worksplace";
import getAutomaticlyToken from '@services/getToken';

interface Props {
  setworkplace: React.Dispatch<React.SetStateAction<wokrplacesType>>
  workplace: wokrplacesType;
  allWorksPlace: wokrplacesType[];
}

const SelectBearer = ({setworkplace, workplace, allWorksPlace }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Requisicao | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedItem(workplace.requisicao[selectedIndex - 1]);
  };

  const handlePrintSelectedItem = () => {
    if (selectedItem) {
      //console.log(selectedItem.url);
      getAutomaticlyToken(selectedItem, workplace, allWorksPlace,setworkplace);
    }
  };
  
  return (
    <>
      <select
        className="bg-transparent text-xs w-fit"
        onChange={handleSelectChange}
        onClick={handlePrintSelectedItem} // Optional: to log the selected item when clicked
      >
        <option value="" hidden className="lowercase">
          Bearer
        </option>
        {workplace &&
          workplace.requisicao &&
          workplace.requisicao.map((item, index) => (
            <option key={index} value={item.name} className="lowercase bg-transparent text-black w-fit">
                {item.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectBearer;
