<p>
  <h1 align="center">Desafio de Programação Fullstack – Vaga Júnior</h1>
</p>
<p>
  <h3>Parte teórica</h3>
</p>

<p>:page_with_curl: 1. Explique a diferença entre <code>var</code>, <code>let</code> e <code>const</code> no JavaScript.</p>
<p>As variáveis declaradas com <code>let</code> e <code>var</code> pode ser alteradas ao longo do código, o <code>cont</code> não pode, variáveis declaradas como <code>var</code> pode ser redeclarada, as outras não. E as variáveis declaradas como <code>let</code>e <code>const</code> só existem no escopo do bloco que foram declaradas enquanto a <code>var</code> vai existir fora e dentro.</p>

<p>:page_with_curl: 2. O que é <code>async/await</code> e como ele facilita o trabalho com código assíncrono?</p>
<P>
<code>Async</code> quer dizer que o bloco de código é assíncrono, ou seja, o programa não vai esperar por esse bloco de código terminar e vai continuar a execução, e quando o bloco de código retornar algo a aplicação volta para executar o que foi definido para rodar depois. <br />
O <code>await</code> diz para a aplicação esperar um bloco de código terminar antes de continuar a execução. <br />
Ele facilita o trabalho pois, é mais fácil de tratar erros com <code>async/await</code> e tem o fluxo linear.
</p>

<p>:page_with_curl: 3. O que é uma API e qual seu papel na comunicação entre frontend e backend?</p>
<P>
  API é um conjunto de serviços e protocolos que interligam dois ou mais sistemas entre si, através de chamadas. <br />
  Seu papel no frontend e backend é conectar ambos através de requisições HTTP, onde o frontend solicitara serviços a serem executados no backend e retornados, assim separando as responsabilidades em camadas e permitido melhor organização e adaptabilidade.
</p>

<p>:page_with_curl: 4. Cite dois métodos HTTP e explique em quais casos são usados.</p>
<P>
  POST e PUT. <br />
  POST é usado para requisições que vão criar algo no sistema e que vão enviar algum dado no corpo da requisição. <br />
  PUT é usado quando se vai atualizar algum registro existente, onde se vai enviar todos os dados desse registro e que todos os campos vão ser atualizados mesmo que apenas um tenha mudado de valor.
</p>

<p>:page_with_curl: 5. Em uma requisição ao backend, como você trataria:
<br/>a) Sucesso
<P>Retornaria um response com o HTTP 200 e uma mensagem de sucesso, caso alog tenha sido criado retornaria um HTTP 201.</p>

<br/>b) Erro (ex.: 404 ou 500)  
<P>
Em caso de 404, colocaria um <code>if</code> para chegar se a função de busca retornou algo, caso não tenha retornado nenhum valor, enviarei um response HTTP 404 para o frontend informando que nada foi achada. <br />
Em caso de erro 500 utilizaria um <code>trycatch</code> para a aplicação não quebrar e retornaria o erro para o frontend ou salvaria em uma aplicação que monitora erro ou em uma tabela de <code>errorLog</code> junto com a mensagem do motivo de erro.
</p>

<br/>c) Resposta muito lenta (informando o usuário)  
<P>
Colocando um <code>timeout</code> por volta do bloco de código passível de ter esse erro, com um tempo limite para esse bloco retornar algo, caso o tempo limite se exceda, mandaria um response HTTP 408/504 informando ao frontend que não houve resposta.
</p>
</p>

---

<h3>Parte Prática</h3>
<h4>Como rodar o projeto</h4>

<p>
  <h4>Backend</h4>
  <ul>
      <li>Com o comando <code>git clone https://github.com/E3ND/student_platform</code> clone o reposítório no seu PC</li><br /
      <li>Na raiz do projeto criei um arquivo <code>.env</code> contendo as seguintes variaveis <br /> 
        <code>DATABASE_URL="postgresql://user:admin@localhost:5432/register_students"</code>        
        <code>TOKEN="OINSDFG938P4UIONSJDKF404J"</code> 
      </li>
    <br /
    <li>
        :warning: Caso você opte por mudar a variavel <code>DATABASE_URL</code>, lembre-se de mudar também na hora de criar o seu banco de dados, a variavel <code>TOKEN</code> pode ter qualquer valor.
    </li> <br />
      <li>
        No seu terminal caso rode o comando <br />
        <code>docker run --name studens -e POSTGRES_USER=user -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=register_students -p 5432:5432 -d postgres</code>
      </li> <br />
      <li>
        :warning: Os dados de criação do banco de dados postgresql tem que ser igual a url de conexão <code>DATABASE_URL</code> <br />
        Caso você não tenha ou não queira usar docker, basta executar o comando SQL presente na pasta <code>database</code>
      </li> <br /
      <li>
        Com o seu banco de dados rodando na raiz do projeto execute o comando <br />
        <code>npm install</code>
      </li> <br />
      <li>
        Ainda na raiz da pasta, caso você não tenha criado as tabelas execute o comando <br />
        <code>npx prisma db push</code> <br />
        Após isso execute o comando
        <code>npx prisma generate</code> <br />
      </li> <br />
      <li>
        E por fim execute o comando ainda na raiz do projeto <br />
        <code>npm run dev</code>  <br />
        E com isso o backend vai estar pronto
      </li>
  </ul>

  <h4>Frontend</h4>
  <ul>
      <li>
        Na raiz da pasta <code>frontend</code> criei outro arquivo .env com a seguinte variavel <br />
        <code>VITE_BACKEND_URL="http://localhost:3333"</code> <br />
        :warning: Por padrão o backend vai rodar na porta 3333
      </li><br />
      <li>
        Rode o comano <code>npm install<code> na pasta frontend <br />
        Depois rode o comando <br />
        <code>npm run dev</code>
        Por padrão o frontend vai estar disponível para acesso na URL <br />
        <code>http://localhost:5173/</code>
      </li>
  </ul>
</p>
