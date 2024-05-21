import { ResponsesType } from "./response";

export interface wokrplacesType {
    id?: number;
    name: string;
    folders: FoldersType[]
    requisicao: Requisicao[]
    tokenAuth?: string;
}

export interface Requisicao {
  name: string;
  method: string
  url: string
  body?: string;
  lastResponse?: ResponsesType
  lastHeaders?: string
  optionBearer?: string
}

export interface FoldersType {
  name: string;
  requisicao?: Requisicao[]
}