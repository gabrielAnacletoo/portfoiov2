import { useState, useEffect } from "react";
import { Requisicao } from "types/worksplace";

interface Props {
  setBodyJson: (bodyJson: string) => void;
  bodyJson: string;
  requisicao: Requisicao;
}

const BodyJson = ({ setBodyJson, requisicao }: Props) => {
  const [localBodyJson, setLocalBodyJson] = useState(requisicao.body || '');

  useEffect(() => {
    setLocalBodyJson(requisicao.body || '');
  }, [requisicao.body]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalBodyJson(e.target.value);
    setBodyJson(e.target.value);
  };

  return (
    <div className="p-1 font-mono text-sm">
      <textarea
        className="w-full md:h-screen overflow-auto p-2 rounded bg-transparent"
        value={localBodyJson}
        onChange={handleChange}
        placeholder="Digite o JSON aqui..."
      />
    </div>
  );
};

export default BodyJson;
