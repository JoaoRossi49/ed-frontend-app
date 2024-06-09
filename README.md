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

Ou usando yarn:
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

