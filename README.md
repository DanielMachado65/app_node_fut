# App Fut (node)

app desenvolvido para estudos da ufpr

## Descrição:

> Um gestor de futebol solicitou uma aplicação capaz de gerenciar um banco
de informação sobre times de futebol.

- Ele solicita as seguintes funções:
- Cadastro de times – informando nome, cidade e estado do time. Série que o time
atua no campeonato nacional (permitir séries A, B, C ou vazio para não atua no
campeonato). Um json array (titles) guardando a quantidade de títulos do time
{estadual, nacional e internacional}. A folha de pagamento do time. Apenas o campo
série do campeonato brasileiro pode ser vazio.
- Listagem de todos os times cadastrados (retornando todos os dados)
- Pesquisa de time por nome (retornando todos os dados dos times com aqueles
caracteres fornecidos)
- Edição de um time – permitindo atualizar qualquer um dos campos
- Remoção de um time – permitindo deletar um time fornecido a partir do ID.

### Especificação

A equipe deve criar endpoints para todos as possíveis ações fornecidas
pela API.
- Use um módulo com um json array para simular a base de dados dos times
(conforme visto na API_HP).

### Postman

https://www.getpostman.com/collections/e8711bf1d7029bd096be