## Perguntas Técnicas

### 1. Quanto tempo você usou para completar a solução apresentada? O que você faria se tivesse mais tempo?

Utilizei 3 dias e meio de trabalho, sendo 3 dias dedicados programando e meio dia organizando as tarefas do projeto.

Se tivesse mais tempo, desenvolveria melhor os testes e dividiria a lógica do controller em funções menores para facilitar a manutenção e os testes.

Também trocaria o padrão dos nomes do MySQL para camelCase para utilizar o mesmo padrão utilizado no node.

Optei por utilizar as Raw queries do Sequelize para conexão com o banco, mas acredito que trocaria para o uso dos modelos do Sequelize para facilitar os testes e adicionar o retorno de mais status.

E acredito que um outro endpoint com uma lista mais amiguavel das cidades do Brasil possa ser inteiressante já que a lista completa é bem extensa http://bulk.openweathermap.org/sample/

### 2. Se usou algum framework, qual foi o motivo de ter usado este? Caso contrário, por que não utilizou nenhum?

Utilizei o Express, devido a agilidade que ele acrescenta a criação do projeto.

Nos testes utilizei o Jest, devido a documentação acessível