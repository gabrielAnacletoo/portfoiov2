import axios, { AxiosRequestConfig } from "axios";
import { Requisicao, wokrplacesType } from "types/worksplace";

const getAutomaticlyToken = async (
    requisicao: Requisicao,
     worksplace: wokrplacesType, 
     allWorksPlace: wokrplacesType[],
     setworkplace: React.Dispatch<React.SetStateAction<wokrplacesType>>) => {
    const { method, url, body } = requisicao;
    const requestBody: string = body ?? '';

    try {
        const config: AxiosRequestConfig = {
            method: method,
            url: url,
            data: JSON.parse(requestBody),
        };

        const response = await axios(config);

        if (response.status !== 404 && response.status !== 500) {
            const responseData = response.data;
            // Procure uma chave que contenha "token"
            const tokenKey = Object.keys(responseData).find(key => key.toLowerCase().includes("token"));

            if (tokenKey) {
                const token = responseData[tokenKey];
                //sconsole.log("Token retornado da API:", token); // Exiba apenas o valor do token

                const updatedWorkplace = { ...worksplace, tokenAuth: token };
                setworkplace(updatedWorkplace);
                // Atualizar o localStorage
                localStorage.setItem("workplaces", JSON.stringify(allWorksPlace.map(wp => wp.id === updatedWorkplace.id ? updatedWorkplace : wp)));

                return { result: token, status: response.status };
            } else {
                console.log("Nenhum token encontrado na resposta da API.");
                return { result: responseData, status: response.status };
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    console.log('ERRO',error.response.data.message);
     return {result: error.response.data.message, status: error.response.data.statusCode};
    }
};

export default getAutomaticlyToken;
