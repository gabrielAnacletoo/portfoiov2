# Meu Portfólio com React + TypeScript + Vite

Este projeto é um portfólio pessoal desenvolvido com React, TypeScript e Vite. Ele exibe meus trabalhos e projetos, oferecendo uma navegação intuitiva e um design moderno. O diferencial deste portfólio é a integração de um cliente HTTP REST totalmente funcional, permitindo interações dinâmicas com APIs externas.

## Funcionalidades do Projeto

- **Exibição de Trabalhos:** Apresenta uma galeria dos meus projetos e trabalhos anteriores, com descrições detalhadas e imagens.
- **HTTP REST Client:** Integração com um cliente HTTP REST, permitindo que o portfólio se comunique com APIs externas para buscar dados em tempo real.
- **Design Responsivo:** Layout responsivo que se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência de usuário em dispositivos móveis e desktops.
- **Desempenho Otimizado:** Utilização do Vite para uma construção rápida e eficiente do projeto, com Hot Module Replacement (HMR) para um desenvolvimento mais ágil.

## Configuração e Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/gabrielAnacletoo/portfoiov2.git
    cd portfoiov2
    ```

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

## Expansão da Configuração do ESLint

Se você estiver desenvolvendo uma aplicação para produção, recomendamos atualizar a configuração para habilitar regras de linting com reconhecimento de tipos:

- Configure a propriedade `parserOptions` no nível superior como mostrado abaixo:

    ```js
    export default {
      // outras regras...
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    }
    ```

- Substitua `plugin:@typescript-eslint/recommended` por `plugin:@typescript-eslint/recommended-type-checked` ou `plugin:@typescript-eslint/strict-type-checked`
- Opcionalmente, adicione `plugin:@typescript-eslint/stylistic-type-checked`
- Instale [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) e adicione `plugin:react/recommended` e `plugin:react/jsx-runtime` à lista `extends`

## Estrutura do Projeto

Aqui está uma visão geral da estrutura de diretórios do projeto:

```plaintext
├── public
│   └── vite.svg
├── src
│   ├── assets
│   ├── components
│   │   └── ui
│   ├── pages
│   ├── services
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
└── README.md
