import React, { useState } from 'react';
import { WorksLinks } from '@constants/worksLinks';
import Next from '@icons/prox.svg'
import Prev from '@icons/prev.svg'
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';


const WorksDesktop: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % WorksLinks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + WorksLinks.length) % WorksLinks.length);
  };

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden">
      {WorksLinks.length > 0 && (
        <div key={currentIndex} className="text-center">
          <h1 className="font-semibold fontFamily-bebas-1 text-3xl">{WorksLinks[currentIndex].name}</h1>
          <div className='flex flex-row w-full jsutify-between items-center overflow-auto'>
          <button onClick={handlePrev} className="mx-2 px-4 py-2 rounded"><img src={Prev} className='w-10 h-10'/> </button>

         <div className='flex flex-col items-center justify-center w-full '>
        <Link to={WorksLinks[currentIndex].url} target="_blank"  className='w-3/5 '> 
        <img src={WorksLinks[currentIndex].imgURL} /></Link>

         <span >{WorksLinks[currentIndex].descricao}</span>
         </div>

          <Button onClick={handleNext} className="mx-2 px-4 py-2 rounded" variant="ghost"><img src={Next} className='w-10 h-10'/> </Button>

          </div>
      
        </div>
      )}
    </div>
  );
};

export default WorksDesktop;
