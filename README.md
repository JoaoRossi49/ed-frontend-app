<<<<<<< HEAD
# GIE (Gestão de instituições de ensino) - Frontend application

Criação de sistema de informação que unifique processos, gerencie acesso de usuários e garanta níveis adequados de disponibilidade de dados e segurança de informação afim de melhorar os processos de instituições de ensino filantrópicas. Essa aplicação é complementada pela lógica e gerenciamento de dados providos pelo projeto django no repositório [ed-backend-app](https://github.com/JoaoRossi49/ed-backend-app).

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autores](#autores)

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão  v18.18.0)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Clonando o Repositório

```bash
git clone https://github.com/JoaoRossi49/ed-frontend-app
cd ed-frontend-app
```

### Instalando Dependências

Usando npm:
```bash
npm install
```
Ou:
```bash
yarn install
```

## Configuração

### Arquivo de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente:

```
DJANGO_URL=http://localhost:8000
```

## Uso

### Executando o Servidor de Desenvolvimento

Usando npm:
```bash
npm start
```

Ou usando yarn:
```bash
yarn start
```

O projeto será executado em [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start` ou `yarn start`

Inicia o servidor de desenvolvimento.

### `npm build` ou `yarn build`

Cria uma versão de produção do aplicativo na pasta `build`.

## Estrutura de Pastas

Uma visão geral da estrutura de pastas do projeto:

```plaintext
ed-frontend-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
|   ├── examples/
|   ├── layouts/
|   ├── services/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md
```

### `public/`

Contém o arquivo HTML estático e outros arquivos públicos.

### `src/`

Contém os arquivos do código-fonte do projeto.

### `src/assets/`

Contém arquivos de recursos como imagens e fontes.

### `src/components/`

Contém os componentes reutilizáveis da aplicação.

### `src/App.js`

Componente principal da aplicação.

### `src/index.js`

Ponto de entrada da aplicação.

## Licença

Este projeto utiliza como base o desenvolvimento feito em [material-dashboard-react](https://github.com/creativetimofficial/material-dashboard-react) por [Creative Tim](https://github.com/creativetimofficial) e está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **João Rossi** - [JoaoRossi49](https://github.com/JoaoRossi49)

=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> main
