import { Icons } from "@constants/worksLinks"
import { Linkedin, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import DownloadIcon from '@icons/download_24dp_FILL0_wght400_GRAD0_opsz24.svg'
import { MouseEvent } from 'react';
import { useNavigate } from "react-router-dom"
const CurriculoComponent = () => {
    const navigate = useNavigate();
    
    
    const pdfUrl = './assets/Gabrielanacletodev.pdf'; // Substitua pelo caminho ou URL do seu PDF

    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Gabriel anacleto dev.pdf'; // Nome do arquivo ao baixar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div className="flex flex-col md:w-6/12 items-center p-2 mx-auto h-screen overflow-auto">

        <div className="flex flex-row justify-start w-full">

        </div>
        <div className="flex flex-row w-full justify-start items-center">
            
        <h1 className="font-bold md:text-6xl text-4xl
        mt-10 md:m-0 fontFamily-bebas-1 md:justify-start mb-3">wilson gabriel a. de souza</h1> 
        </div>

    <div className="flex md:flex-row w-full justify-start items-center md:text-sm text-xs flex-col">
        <div className="w-full flex flex-row">
        <Phone size={20} className="md:ml-3" /> <a  className="ml-2" href="tel:14991971264">(14)99197-1264</a>
        </div>

        <div className="w-full flex flex-row">
        <Mail size={20} className="md:ml-3"/> <a className="mx-2" href="mailto:gabrielanacleto159@live.com">gabrielanacleto159@live.com</a>
        </div>

        <div className="w-full flex flex-row">
        <Linkedin  size={20} className="md:ml-3"/> <a className="mx-2 mt-1" href="https://www.linkedin.com/in/gabriel-anacletoo/" target="_blank">Gabriel Anacleto</a>
        </div>
    </div>

<div className="flex justify-start flex-col mt-3 w-full">
        <div className="flex flex-row w-full justify-start">
        <h1 className="font-bold md:text-1xl md:m-0 fontFamily-bebas-1 ">Tecnologias que utilizo:</h1>
        <div className="flex flex-row justify-between items-center">
                {Icons.map((icon, index) => (
                    <img key={index} src={icon} className="md:w-5 h-5 md:mx-1 ml-0.5 " alt={`tech-${index}`} />
                ))}
        </div>
        </div>
</div>

<div className="flex flex-row w-full justify-start items-center">
        <h1 className="font-bold md:text-6xl text-4xl
        md:mt-10 md:m-0 mt-5 fontFamily-bebas-1 justify-start">Formação</h1>
</div>
     <div className="flex w-full justify-start flex-col">
        <span className="font-bold fontFamily-poppins text-sm">UNISAGRADO (Bauru-SP)</span>     
        <span className="text-xs">Analise e desenvolvimento de sistemas (<span className="font-semibold">inicio 2024 - conclusão 2026</span>)</span>   
     </div>
     <div className="flex w-full justify-start flex-col mt-2">
        <span className="font-bold fontFamily-poppins text-sm">Arnia.com.br</span>     
        <span className="text-xs">Desenvolvedor Full-stack(<span className="font-semibold">inicio 2023 - conclusão 2024</span>)</span>   
     </div>
     <div className="flex w-full justify-start flex-col mt-2">
        <span className="font-bold fontFamily-poppins text-sm">Itec - bauru</span>     
        <span className="text-xs">Ensino médio.</span>   
     </div>
     
     <div className="flex flex-row w-full justify-start items-center">
     <h1 className="font-bold md:text-6xl text-4xl
    md:mt-10 md:m-0 mt-5 fontFamily-bebas-1 justify-start underline cursor-pointer" 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick={(_event: MouseEvent<HTMLHeadingElement>) => navigate('/')}>Experiências</h1>
       
    </div>

    <div className="flex w-full justify-start flex-col mt-2">
        <Link to="/"> <span className="underline fontFamily-poppins text-1xl hidden md:flex">  Principais projetos </span></Link>
     </div>
     
<div className="md:hidden flex flex-col w-full justify-start items-center">


    {/* <div className="flex w-full justify-start flex-col mt-2">

        <span className="font-bold fontFamily-poppins text-sm mb-1">Economarket</span>     
        <span className="text-xs">Cargo: Desenvolvedor Back-end (2024)</span>   

        <span className="font-bold fontFamily-poppins text-sm mt-1">Izap Fábrica de Software</span>     
        <span className="text-xs">Cargo: Desenvolvedor Full-stack</span>   

        <span className="font-bold fontFamily-poppins text-sm">Economarket</span>     
        <span className="text-xs">Cargo: Desenvolvedor Back-end</span>   
     </div> */}
</div>
<div className="flex w-full flex-row justify-start mt-5 md:mt-1 items-center cursor-pointer" onClick={handleDownload}>

<div className="flex flex-row w-full justify-start items-center">
        <h1 className="font-bold md:text-5xl text-1xl
        md:mt-0 md:m-0 fontFamily-bebas-1 justify-start">Baixar CV</h1>
        <img src={DownloadIcon} className="w-5 h-5 mb-1 md:w-16 md:h-16 "/>
</div>

</div>

</div>
  )
}

export default CurriculoComponent