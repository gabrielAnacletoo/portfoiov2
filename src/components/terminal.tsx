import React, { useEffect, useState } from 'react';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [pipeVisible, setPipeVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPipeVisible((prev) => !prev);
    }, 550);

    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeCommand();
    }
  };

  const executeCommand = () => {
    let newOutput = '';
    switch (command.toLowerCase()) {
      case 'ajuda':
        newOutput = 'Comandos disponíveis: ajuda, sobre, contato';
        break;
      case 'comandos':
        newOutput = 'Comandos disponíveis: ajuda, sobre, contato';
        break;
      case 'sobre':
        newOutput = 'Bem-vindo(a) ao meu portfólio, Me chamo <b>Gabriel Anacleto 🧑‍💻</b><br>Sou apaixonado por tecnologia desde a infância. Gosto de programar mesmo no meu tempo livre.<br>Atualmente, costumo utilizar no dia a dia algumas bibliotecas e frameworks como Nest JS, Vite e Tailwind, além de alguns ORMs como Prisma e TypeORM. Quanto ao banco de dados, costumo utilizar PostgreSQL, MySQL, MongoDB, Firebase e Supabase.<br>Nesse projeto você vai encontra um rest client que é um projeto meu, sinta-se á vontade para usa-lo'
        break;
      case 'contato':
        newOutput = 'Você pode me enviar um e-mail para: gabrielanacleto159@live.com';
        break;
      default:
        newOutput = `Comando não encontrado: ${command}`;
        break;
    }
    setOutput(newOutput);
    setCommand('');
  };

  return (
    <div className=" p-4 rounded-lg border border-gray-600 shadow-lg font-mono overflow-hidden">
      <div className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <span>{command}{pipeVisible ? '|' : ''}</span>
      </div>
      <input
        type="text"
        className="bg-transparent outline-none  mt-2" // Corrigi a cor do texto para branco
        value={command}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
        autoFocus
      />
      <div className="mt-2 text-base lg:text-sm xl:text-base font-mono text-green-400">
        {/* Corrigi a parte do HTML dinâmico */}
        {output ? (
          <span dangerouslySetInnerHTML={{ __html: output }} />
        ) : (
          'Comandos disponíveis: ajuda, sobre, contato'
        )}
      </div>
    </div>
  );
};

export default Terminal;
