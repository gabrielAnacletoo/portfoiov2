import React, { useState } from 'react';
import { ResponsesType } from 'types/response';
import { Requisicao } from 'types/worksplace';

interface Props {
  selectedRequisicao: Requisicao extends Requisicao ? Requisicao : never
  response: ResponsesType
}

const ResponseRequest = ({ selectedRequisicao, response  }: Props) => {
 //console.log(response)
  const { status, result } = selectedRequisicao.lastResponse ||  response;

  const [statusClass, setStatusClass] = useState<string>('');
  const getStatusClass = (statusSelected: string): string => {
    const map: Record<string, string> = {
      '200': "bg-green-500",
      '201': "bg-green-500",
      '500': "bg-red-500",
      '404': "bg-red-500",
    };
    return map[statusSelected] || '';
  }

  // Atualiza a classe de status sempre que o status da resposta mudar
  React.useEffect(() => {
    setStatusClass(getStatusClass(String(status)));
}, [status]);
   
const addLineBreaksIfNeeded = (text: string, maxLength: number): string => {
  if (maxLength <= 0) {
    throw new Error("maxLength must be a positive number");
  }
  if (text.length > maxLength) {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return text.match(regex)?.join('\n') || text;
  }
  return text;
};

const renderResult = () => {
  if (!result) return null;

  if (typeof result === 'string') {
    return <pre className="text-yellow-1 break-words whitespace-pre-wrap">{result}</pre>;
  } else {
    return (
      <pre className="text-yellow-1 whitespace-pre-wrap">
        {Object.entries(result).map(([key, value]) => {
          const formattedValue = addLineBreaksIfNeeded(JSON.stringify(value, null, 2), 47);
          const shouldAddNewLines = formattedValue.length > 57;
          
          return (
            <div key={key}>
              <span className="text-purple-1">
                {shouldAddNewLines ? `{\n "${key}": ` : `{ "${key}": `}
              </span>
              <span className="text-yellow-1 break-words">{formattedValue}</span>
              <span className="text-purple-1">
                {shouldAddNewLines ? `\n}` : `}`}
              </span>
            </div>
          );
        })}
      </pre>
    );
  }
};

  

  return (
    <>
      {status && (
        <div >
          <span>Status &nbsp;</span>
          <span
            className={`px-2 py-1 font-semibold text-white cursor-pointer ${statusClass}`}
          >
            {status}
          </span>
        </div>
      )}
     <div className="text-xs mx-auto w-[90%] flex flex-wrap text-wrap my-5 border overflow-auto px-1 py-1 h-screen md:border-gray-600 rounded-sm bg-transparent">
        {renderResult()}
      </div>
    </>
  );
}

export default ResponseRequest;
