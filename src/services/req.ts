import axios, { AxiosRequestConfig } from "axios";
import { Requisicao, wokrplacesType } from "types/worksplace";

const SendRequisicao = async (requisicao: Requisicao, workplace: wokrplacesType) => {
   // console.log('requisicao', requisicao);
    const { method, url, body } = requisicao;
    const requestBody: string = body ?? '';

    const isValidJson = (str: string) => {
        if (!str) return false; // Empty string is not valid JSON
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    const parsedBody = isValidJson(requestBody) ? JSON.parse(requestBody) : null;

    try {
        const config: AxiosRequestConfig = {
            method: method,
            url: url,
            ...(method !== 'GET' && parsedBody && { data: parsedBody }),
            headers: {
                Authorization: 'Bearer ' + workplace.tokenAuth,
            },
        };

        const response = await axios(config);

        if (response.status) {
            //console.log('RESPOSTA', response.data);
            return { result: response.data, status: response.status };
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        //console.log('ERRO', error);
        console.log({ result: error.response?.data?.message, status: error.response?.data?.statusCode });
        return { result: error.response?.data?.message, status: error.response?.data?.statusCode};
    }
};

export default SendRequisicao;
