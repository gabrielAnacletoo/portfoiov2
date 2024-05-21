import { Link } from 'react-router-dom';
import { ModeToggle } from '@components/mode-toggle';

const Navbar = () => {

  return (
    <div className={`flex justify-end w-full  p-4 font-semibold items-center`} >
      <ModeToggle />
      <div className='stocks'>
        <Link to="/" className="no-underline mx-5">Início</Link>
      </div>

      <div className=''>
        <Link to="/rest" className="no-underline  mx-5">RestClient</Link>
      </div>
      
      <div className=''>
        <Link to="/curriculo" className="no-underline  mx-5">Currículo</Link>
      </div>


      <div className='flex items-center'> 
        <img src="https://avatars.githubusercontent.com/u/109560707?v=4" className="w-5 hr-5 rounded-full" alt="GitHub Logo"/> {/* Adicione a classe mr-2 para adicionar espaço à direita da imagem */}
        <Link to="https://github.com/gabrielAnacletoo" target='_blank' className="no-underline ml-2">GitHub</Link>
      </div>

    </div>
  );
};

export default Navbar;
