## Projeto de Gerenciamento de Investimentos

Este é um projeto desenvolvido com Nest.js para gerenciar investimentos, o sistema conta com criação de usuário, login, autenticação via token JWT e autorização baseado nas roles. 

Foi utilizando as seguintes tecnologias:

## Tecnologias Utilizadas

- **Nest.js**: Um framework para construção de aplicações Node.js eficientes e escaláveis.
- **TypeScript**: Linguagem que traz tipagem estática ao JavaScript, melhorando a manutenção do código.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados de forma estruturada.
- **Prisma**: ORM (Object-Relational Mapping) que facilita a interação com o banco de dados.
- **Docker**: Plataforma para desenvolvimento e execução de aplicativos em containers, garantindo consistência no ambiente de execução.
- **Jest**: Framework de testes para garantir a qualidade e a confiabilidade do código.
- **Swagger**: Ferramenta para documentação de APIs, permitindo que os desenvolvedores entendam facilmente como utilizar a API.

## Instruções de Compilação

Para compilar e rodar o projeto, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Rodrigojuniorj/investx.git
   cd investx
2. **Instale as dependências**:
   ```bash
   yarn
3. **Rode os testes**:
   ```bash
   yarn test
4. **Como o projeto foi desenvolvido usando Docker, utilize o comando abaixo para rodar o projeto**:
   ```bash
   yarn docker
## Ferramentas Utilizadas
- **Prisma**: Cliente do Prisma para interagir com o banco de dados.
- **Swagger**: Integração do Swagger para documentação da API.
## Bibliotecas de Terceiros Utilizadas
- **@nestjs/common**: Para construção de módulos e serviços.
- **@nestjs/core**: Núcleo do framework Nest.js.
- **@nestjs/swagger**: Integração do Swagger para documentação da API.
- **@prisma/client**: Cliente do Prisma para interagir com o banco de dados.
- **bcrypt**: Para criptografia de senhas.
- **dotenv**: Para carregar variáveis de ambiente.
## Documentação da API 
A documentação da API gerada pelo Swagger pode ser acessada após iniciado o projeto em: [Documentação da API](http://localhost:3333/api/v1/documentation).