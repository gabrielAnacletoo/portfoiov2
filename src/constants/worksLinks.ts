import IZAP from '../assets/izap2.jpg'
import Economarket from '../assets/tecologys/wp.png'
import Clientes from '../assets/clientes.jpeg'
import W33 from '../assets/w32.jpg'
import API from '../assets/tecologys/API1.png'
import CENPROT from '../assets/Captura de tela 2024-05-20 081901.png'

//icones technologys
import React from '../assets/tecologys/react.svg'
import Nest from '../assets/tecologys/NestJS.svg.png'
import Mysql from '../assets/tecologys/mysql-icon.svg'
import Selenium from '../assets/tecologys/Selenium_Logo.png'
import Python from '../assets/tecologys/Python-logo-notext.svg.png'
import Mongo from '../assets/tecologys/mongodb-icon.svg'
import Express from '../assets/tecologys/expressjs-icon.svg'
import Postgre from '../assets/tecologys//postgresql-icon.svg'
import Type from '../assets/tecologys/Typescript_logo_2020.svg.png'
import FireBase from '../assets/tecologys/firebase-svgrepo-com.svg'


export const WorksLinks = [
    {
        name: "EconoMarket",
        url: "https://www.linkedin.com/company/economarket-foodtech/",
        imgURL: Economarket,
        descricao: "EconoMarket é uma Foodtech sediada em Nova-lima (MG). Que tem como missão facilitar o processo de compras de produtos do setor alimentício. Na Aplicação Super-mercados podem registrar produtos que estão próximos ao vencimento, disponibilizando com um preço bem abaixo do normal além disso é possivel ser entregue em residência ou retirado no local. Também desenvolvi um algoritimo 'inteligente', que verifica quais produtos estão mais próximos ao vencimento e altera os preços deles a medida que fica mais próximo a data. além de  um cadastro com códigos GTIN/EAN que será usado para um cadastro mais dinâmico apenas preenchedo o código a API deve então preencher todos os dados do produto. através de scraping eu objetive um banco de dados com mais de 12 mil produtos para isso.",
        cargo: "Desenvolvedor Back-end",
        tech: [Nest,Type, FireBase,Postgre]
    },
    {
        name: "Linkcom Gamification",
        url: "https://app.gamefication.izap.dev/",
        imgURL: IZAP,
        descricao: "O propósito da aplicação Gamification é oferecer um sistema às empresas pelo qual ela poderá oferecer bonificação aos seus funcionários pelo desempenho profissional. O administrador/RH atribui créditos aos funcionários de acordo com a sua performance e estes por sua vez poderão realizar resgates de produtos conforme o saldo de créditos que possui.",
        cargo: "Desenvolvedor Fullstack",
        tech: [React, Nest,Type,FireBase,Mysql ]
    },
    {
        name: "W3ERP",
        url: "https://w3erp.com.br/",
        imgURL: W33,
        descricao: `Esse Sistema foi um projeto do curso de Desenvolvimento full stack da https://arnia.com.br onde consumios a API de um parceiro da instituição, e construimos seu sistema para ter acesso  a quantidade de produtos que estavam em baixa no estoque, em alta, clientes com produtos em baixa entre outras informações. Utilizamos basicamente React com axios para isso. além de exibir gráficos com informações, também foi onde aprendi a utilizar Debbounce que agora é usado em práticamente qualquer aplicação que construo.`,
        cargo: "Desenvolvedor Front-end",
        tech: [React, Nest,Type,Mysql ]
    },
    {
        name: "Prospecção de Clientes",
        url: "",
        imgURL: Clientes,
        descricao: "Esse Sistema foi um trabalho free lancer, ele acessa diversos sites inclusive o da receita para capturar dados de clientes, obtendo CNPJ, email, endereços, telefones e o que mais precisar. Também é possivel exportar para uma tabela XLXS ou baixar todos as pesquisar já feitas, Ja que todas são salvas em um banco de dados. Cada cliente leva em média 0.4 segundos para ter as informações extraidas. Ele tem uma pequena API feita com express e JWT para autenticação.",
        cargo: "Desenvolvedor Front-end",
        tech: [React,Type,Mongo, Express ]
    },
    {
        name: "API - Meta vagas",
        url: "https://github.com/gabrielAnacletoo/ProjetoModulo3",
        imgURL: API, 
        descricao: `Essa API foi desenvolvida no módulo 3 do Curso de desenvolvimento full-stack na https://arnia.com.br. Encontre o seu próximo emprego dos sonhos! Minha API permite busca avançada por salário, cidade, contrato, tecnologia e mais. Cadastre-se, faça login seguro com JWT, favorite vagas, e aproveite a paginação fácil.`,
        cargo: "Desenvolvedor Back-end",
        tech: [React, Type, Postgre, Mongo]
    },
    {
        name: "BOT Protestos",
        url: "",
        imgURL: CENPROT, 
        descricao: `Bot feito para um trabalho free lancer, Ele acessa o site do CENPROT faz login, Verifica  seu email para obter o link de confirmação necessário no primeiro login do dia, Além  disso ele também é capaz de Passar sozinho pelo sistema Recaptcha do google, depois disso ele gera um json para utilzar como quiser. Para uma pesquisa mais veloz todas as pesquisas são salvas em cache e tem como validade 1 dia, Após 24 todas as pesquisas são apagadas.`,
        cargo: "Desenvolvedor",
        tech: [Python,Mongo,Selenium ]
    },
]

export const Icons = [
    React, Nest, Mysql, Selenium, Python, Mongo, Postgre, Type, FireBase
]