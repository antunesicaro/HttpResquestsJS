/* //Ajax, requisição http
//exemplo:Carregar página autotamticamente sem precisar recarrega-la
//pegando um conteúdo html e jogando em um componente da página

const request = (objeto) => { //bota na const request uma função que recebe um objeto como parametro e executa a ação:
  const xhr = new XMLHttpRequest(); //chama o construtor de XMLHttpRequest, pois dentro dele tem vários métodos, e queremos habilitar esses métodos para podermos usar. obs: faz essa chamada de construtor e bota dentro da const xrh, que significa de maneira padrão o XMLHttpRequest
  xhr.open(objeto.method,objeto.url,true) 
  xhr.send();

  xhr.addEventListener('load',() => { //ao ocorrer o evento de load, uma ação vai ser executada 
    if(xhr.status >= 200 && xhr.status < 300){ //se o status ficar entre 200 e 300, significa em código http que foi uma requisição de sucesso e vai nos retoranr um callback de sucesso dentro do objeto que vai ser mandado pra função request
      objeto.success(xhr.responseText); //função de callback de sucesso pra mandar pro const request como argumento, esse responseText é tudo de conteúdo que vamos abrir 
    }else{
      objeto.error(xhr.statusText); //se não estiver entre 200 e 300, é pq deu erro, e vamos mandar o texto do método erro
    }
  })
}

//obs: o comportamento padrão do navegador é clicarmos nos links criados no index.html e ir pra esses links, mas não queremos que isso ocorra, não queremos o comportamento padrão do navegador
//queremos que quando clicar no link, nada seja feito, e sim que o javascript carregue e o conteudo dentro de algum componente da página

//pegando os cliques dos links
document.addEventListener('click',(e) => { //pega todos os cliques no dom
  const el = e.target; //qualquer elemento que for clicado vai ser o e.target, 'alvo'
  const tag = el.tagName.toLowerCase() //tag vai ser o elemento alvo que foi clicado, vai checar sua tag, bota-la tudo em minusculo, e vai especificar dizendo que é a tag 'a', que é link

  if(tag === 'a'){ //se a tag for 'a', executa a ação... pra nao ficar tudo dentro de uma função, dentro dessa ação vai ter um método 
    e.preventDefault(); //faz com que não seja direcionado pro link caso seja clicado em algum link, pois não queremos o redirecionamento e sim fazer uma requisição 
    carregaPagina(el);// executa o carregaPagina, que vai ser criado e passa como argumento o link que foi clicado... mas pq o link? pq nesse link que for clicado, o conteudo dele é o que queremos, ai assim podemos pegar o conteudo tendo o link 
  }
})

function carregaPagina(el){ //recebe o link aqui, mas pq receber ele aqui? simples, pois como queremos o conteúdo desse link, no caso o q tem no seu html escrito, ai vamos pegar seu valor
  const href = el.getAttribute('href'); //aqui na const href já temos o a(link) clicado e pegamos o atributo href dele
  //console.log(href); //quando clicar no link, vamos ter o href desse link, e tendo o href, podemos fazer a requisição
  
  //para fazer a requisição, vamos acionar a função request que criamos
  //para fazer esse request, vamo mandar um objeto, pois a função que criamos recebe um objeto, entao o parametro da funcao request aqui, vai mandar o objeto q ta nessa funcao pra tratar lá na request em si
  request({ 
    method:'GET', //usa o método get para requisitar, pegar, traazer dados
    url: href, //a url q vamos ter é a do href do link a que foi clicado
    success(response){ //se der certo a requisição, faz uma funcao que vai ter o response como argumento, o response é o conteudo
      carregaResultado(response);//response é o responseText que vem como argumento do sucess da função request,são basicamente os dados
    },error(error){
      console.log(error);
    }
  })
}

function carregaResultado(response){ //recebe como aprametro vindo do sucesso do request, o conteudo do link que foi clicado, por exemplo, se cliquei na pagina 1, vai vir pra ca o conteudo html da pagina1
  const divResultado = document.querySelector('.resultado')//seleciono a div resultado que criamos no html para jogar dentro dela o response, que é o conteúdo 
  divResultado.innerHTML = response; //bota o response, que  é o conteudo, pra nova div resultado
}



































//MELHORANDO O CÓDIGO COM PROMISES
//Ajax, requisição http
//exemplo:Carregar página autotamticamente sem precisar recarrega-la
//pegando um conteúdo html e jogando em um componente da página

const request = (objeto) => { //bota na const request uma função que recebe um objeto como parametro e executa a ação:
  return new Promise((resolve,reject) => { //cria uma promise pra falar se deu certo ou não o request
    const xhr = new XMLHttpRequest(); //chama o construtor de XMLHttpRequest, pois dentro dele tem vários métodos, e queremos habilitar esses métodos para podermos usar. obs: faz essa chamada de construtor e bota dentro da const xrh, que significa de maneira padrão o XMLHttpRequest
    xhr.open(objeto.method,objeto.url,true) 
    xhr.send();
  
    xhr.addEventListener('load',() => { //ao ocorrer o evento de load, uma ação vai ser executada 
      if(xhr.status >= 200 && xhr.status < 300){ //se o status ficar entre 200 e 300, significa em código http que foi uma requisição de sucesso e vai nos retoranr um callback de sucesso dentro do objeto que vai ser mandado pra função request
        resolve(xhr.responseText); //deu certo, usa resolve pra mandar o conteudo por parametro
      }else{
        reject(xhr.statusText); //se não estiver entre 200 e 300, é pq deu erro
      }
    })
  })
  

}

//obs: o comportamento padrão do navegador é clicarmos nos links criados no index.html e ir pra esses links, mas não queremos que isso ocorra, não queremos o comportamento padrão do navegador
//queremos que quando clicar no link, nada seja feito, e sim que o javascript carregue e o conteudo dentro de algum componente da página

//pegando os cliques dos links
document.addEventListener('click',(e) => { //pega todos os cliques no dom
  const el = e.target; //qualquer elemento que for clicado vai ser o e.target, 'alvo'
  const tag = el.tagName.toLowerCase() //tag vai ser o elemento alvo que foi clicado, vai checar sua tag, bota-la tudo em minusculo, e vai especificar dizendo que é a tag 'a', que é link

  if(tag === 'a'){ //se a tag for 'a', executa a ação... pra nao ficar tudo dentro de uma função, dentro dessa ação vai ter um método 
    e.preventDefault(); //faz com que não seja direcionado pro link caso seja clicado em algum link, pois não queremos o redirecionamento e sim fazer uma requisição 
    carregaPagina(el);// executa o carregaPagina, que vai ser criado e passa como argumento o link que foi clicado... mas pq o link? pq nesse link que for clicado, o conteudo dele é o que queremos, ai assim podemos pegar o conteudo tendo o link 
  }
})

function carregaPagina(el){ //recebe o link aqui, mas pq receber ele aqui? simples, pois como queremos o conteúdo desse link, no caso o q tem no seu html escrito, ai vamos pegar seu valor
  const href = el.getAttribute('href'); //aqui na const href já temos o a(link) clicado e pegamos o atributo href dele
  //console.log(href); //quando clicar no link, vamos ter o href desse link, e tendo o href, podemos fazer a requisição
  
  //para fazer a requisição, vamos acionar a função request que criamos
  //para fazer esse request, vamo mandar um objeto, pois a função que criamos recebe um objeto, entao o parametro da funcao request aqui, vai mandar o objeto q ta nessa funcao pra tratar lá na request em si
  request({ 
    method:'GET', //usa o método get para requisitar, pegar, traazer dados
    url: href, //a url q vamos ter é a do href do link a que foi clicado
  }).then((response) => { //se deu certo, pega o reponse q tem o conteudo no then, pois then é sucesso
    carregaResultado(response);
  }).catch((error) => { //no catch pega o erro e o mostra
    console.log(error);
  })
}

function carregaResultado(response){ //recebe como aprametro vindo do sucesso do request, o conteudo do link que foi clicado, por exemplo, se cliquei na pagina 1, vai vir pra ca o conteudo html da pagina1
  const divResultado = document.querySelector('.resultado')//seleciono a div resultado que criamos no html para jogar dentro dela o response, que é o conteúdo 
  divResultado.innerHTML = response; //bota o response, que  é o conteudo, pra nova div resultado
}

























//MELHORANDO O CÓDIGO COM ASYNC E AWAIT
//MELHORANDO O CÓDIGO COM PROMISES
//Ajax, requisição http
//exemplo:Carregar página autotamticamente sem precisar recarrega-la
//pegando um conteúdo html e jogando em um componente da página

const request = (objeto) => { //bota na const request uma função que recebe um objeto como parametro e executa a ação:
  return new Promise((resolve,reject) => { //cria uma promise pra falar se deu certo ou não o request
    const xhr = new XMLHttpRequest(); //chama o construtor de XMLHttpRequest, pois dentro dele tem vários métodos, e queremos habilitar esses métodos para podermos usar. obs: faz essa chamada de construtor e bota dentro da const xrh, que significa de maneira padrão o XMLHttpRequest
    xhr.open(objeto.method,objeto.url,true) 
    xhr.send();
  
    xhr.addEventListener('load',() => { //ao ocorrer o evento de load, uma ação vai ser executada 
      if(xhr.status >= 200 && xhr.status < 300){ //se o status ficar entre 200 e 300, significa em código http que foi uma requisição de sucesso e vai nos retoranr um callback de sucesso dentro do objeto que vai ser mandado pra função request
        resolve(xhr.responseText); //deu certo, usa resolve pra mandar o conteudo por parametro
      }else{
        reject(xhr.statusText); //se não estiver entre 200 e 300, é pq deu erro
      }
    })
  })
  

}

//obs: o comportamento padrão do navegador é clicarmos nos links criados no index.html e ir pra esses links, mas não queremos que isso ocorra, não queremos o comportamento padrão do navegador
//queremos que quando clicar no link, nada seja feito, e sim que o javascript carregue e o conteudo dentro de algum componente da página

//pegando os cliques dos links
document.addEventListener('click',(e) => { //pega todos os cliques no dom
  const el = e.target; //qualquer elemento que for clicado vai ser o e.target, 'alvo'
  const tag = el.tagName.toLowerCase() //tag vai ser o elemento alvo que foi clicado, vai checar sua tag, bota-la tudo em minusculo, e vai especificar dizendo que é a tag 'a', que é link

  if(tag === 'a'){ //se a tag for 'a', executa a ação... pra nao ficar tudo dentro de uma função, dentro dessa ação vai ter um método 
    e.preventDefault(); //faz com que não seja direcionado pro link caso seja clicado em algum link, pois não queremos o redirecionamento e sim fazer uma requisição 
    carregaPagina(el);// executa o carregaPagina, que vai ser criado e passa como argumento o link que foi clicado... mas pq o link? pq nesse link que for clicado, o conteudo dele é o que queremos, ai assim podemos pegar o conteudo tendo o link 
  }
})

async function carregaPagina(el){ //recebe o link aqui, mas pq receber ele aqui? simples, pois como queremos o conteúdo desse link, no caso o q tem no seu html escrito, ai vamos pegar seu valor
  const href = el.getAttribute('href'); //aqui na const href já temos o a(link) clicado e pegamos o atributo href dele
  //console.log(href); //quando clicar no link, vamos ter o href desse link, e tendo o href, podemos fazer a requisição
  
  //para fazer a requisição, vamos acionar a função request que criamos
  //para fazer esse request, vamo mandar um objeto, pois a função que criamos recebe um objeto, entao o parametro da funcao request aqui, vai mandar o objeto q ta nessa funcao pra tratar lá na request em si

  try{
    const response = await request({ 
      method:'GET', 
      url: href,
    })
  
    carregaResultado(response);
  }catch(e){
    console.log(e);
  }

}

function carregaResultado(response){ //recebe como aprametro vindo do sucesso do request, o conteudo do link que foi clicado, por exemplo, se cliquei na pagina 1, vai vir pra ca o conteudo html da pagina1
  const divResultado = document.querySelector('.resultado')//seleciono a div resultado que criamos no html para jogar dentro dela o response, que é o conteúdo 
  divResultado.innerHTML = response; //bota o response, que  é o conteudo, pra nova div resultado
}





























//usando fetch, que recebe como primeiro parametro uma ulr a ser carregada, por exemplo... no entanto, no nosso exemplo desejamos carregar um arquivo que tá na raiz das pastas
//obs:fetch já nos retorna uma promise
fetch('pagina1.html') //recebe um href
.then((respostaRecebida) => {//primeiro recebe uma resposta que a promisse deu certo, então podemos pegar essa resposta e tratá-la como uma função... obs, nesse then não vem o conteúdo do html como queremos, logo precisamos  tratar pra poder pegá-lo
  if(respostaRecebida.status !== 200) { //se o status for diferente de 200, é pq n tá ok o recebimento da api
    throw new Error('Error meu criado!');
  }

  return respostaRecebida.text();//usa uma função .text que pega o conteúdo da respostaRecebida, que no caso é pagina1.html nesse exemplo, mas poderia ser muito bem uma url
}).then((respostaRecebidaComHtml) => { //precisamos desse outro then, pois já um return no then anterior, o que faz com gere outra promise, e pra receber o valor dessa promise, usamos outro then
  console.log(respostaRecebidaComHtml); //como no return foi executado uma funcao junto com a respostaRecebida do pagina1.html, a funcao faz com que o .text() pegue o conteudo html dessa pagina1, ai nesse then só fazemos tratar
})  

.catch((erro) => { //se nao existir a pagina ou der erro em qualquer dos then
  console.error(erro);
})



//obs: o comportamento padrão do navegador é clicarmos nos links criados no index.html e ir pra esses links, mas não queremos que isso ocorra, não queremos o comportamento padrão do navegador
//queremos que quando clicar no link, nada seja feito, e sim que o javascript carregue e o conteudo dentro de algum componente da página
//pegando os cliques dos links
document.addEventListener('click',(e) => { //pega todos os cliques no dom
  const el = e.target; //qualquer elemento que for clicado vai ser o e.target, 'alvo'
  const tag = el.tagName.toLowerCase() //tag vai ser o elemento alvo que foi clicado, vai checar sua tag, bota-la tudo em minusculo, e vai especificar dizendo que é a tag 'a', que é link

  if(tag === 'a'){ //se a tag for 'a', executa a ação... pra nao ficar tudo dentro de uma função, dentro dessa ação vai ter um método 
    e.preventDefault(); //faz com que não seja direcionado pro link caso seja clicado em algum link, pois não queremos o redirecionamento e sim fazer uma requisição 
    carregaPagina(el);// executa o carregaPagina, que vai ser criado e passa como argumento o link que foi clicado... mas pq o link? pq nesse link que for clicado, o conteudo dele é o que queremos, ai assim podemos pegar o conteudo tendo o link 
  }
})

 function carregaPagina(el){ //recebe o link aqui, mas pq receber ele aqui? simples, pois como queremos o conteúdo desse link, no caso o q tem no seu html escrito, ai vamos pegar seu valor
  const href = el.getAttribute('href'); //aqui na const href já temos o a(link) clicado e pegamos o atributo href dele
  //console.log(href); //quando clicar no link, vamos ter o href desse link, e tendo o href, podemos fazer a requisição
  

  fetch(href) //busca o ref da pagina, por exemplo pagina1.html,carregando o link
  .then((resposta) => { //pegando a respota do link no then
    //faz checagem se o status da resposta no servidor nao deu nenhum erro, se nao deu,  retorna a resposta transformada em texto(conteudo html) para a outra promise tratar, pois fetch nos retorna uma promise
    if(resposta.status !== 200){
      throw new Error('Nosso erro');
    }else{
     return resposta.text(); //transformando a respota q era pagina1.html no conteudo html da pag
    }
   
  }).then((conteudoHtml) => {
    carregaResultado(conteudoHtml); //cria uma nova funcao pra não ficar tudo junto e envia pra ela o conteudo html, e nessa funcao tratamos ele
  }).catch((e) => {
    console.error(e);
  })

function carregaResultado(response){ //recebe como aprametro vindo do sucesso do request, o conteudo do link que foi clicado, por exemplo, se cliquei na pagina 1, vai vir pra ca o conteudo html da pagina1
  const divResultado = document.querySelector('.resultado')//seleciono a div resultado que criamos no html para jogar dentro dela o response, que é o conteúdo 
  divResultado.innerHTML = response; //bota o response, que  é o conteudo, pra nova div resultado
}

 }


*/

//FETCH COM ASYNC E AWAIT
//usando fetch, que recebe como primeiro parametro uma ulr a ser carregada, por exemplo... no entanto, no nosso exemplo desejamos carregar um arquivo que tá na raiz das pastas
//obs:fetch já nos retorna uma promise
fetch('pagina1.html') //recebe um href
.then((respostaRecebida) => {//primeiro recebe uma resposta que a promisse deu certo, então podemos pegar essa resposta e tratá-la como uma função... obs, nesse then não vem o conteúdo do html como queremos, logo precisamos  tratar pra poder pegá-lo
  if(respostaRecebida.status !== 200) { //se o status for diferente de 200, é pq n tá ok o recebimento da api
    throw new Error('Error meu criado!');
  }

  return respostaRecebida.text();//usa uma função .text que pega o conteúdo da respostaRecebida, que no caso é pagina1.html nesse exemplo, mas poderia ser muito bem uma url
}).then((respostaRecebidaComHtml) => { //precisamos desse outro then, pois já um return no then anterior, o que faz com gere outra promise, e pra receber o valor dessa promise, usamos outro then
  console.log(respostaRecebidaComHtml); //como no return foi executado uma funcao junto com a respostaRecebida do pagina1.html, a funcao faz com que o .text() pegue o conteudo html dessa pagina1, ai nesse then só fazemos tratar
})  

.catch((erro) => { //se nao existir a pagina ou der erro em qualquer dos then
  console.error(erro);
})



//obs: o comportamento padrão do navegador é clicarmos nos links criados no index.html e ir pra esses links, mas não queremos que isso ocorra, não queremos o comportamento padrão do navegador
//queremos que quando clicar no link, nada seja feito, e sim que o javascript carregue e o conteudo dentro de algum componente da página
//pegando os cliques dos links
document.addEventListener('click',(e) => { //pega todos os cliques no dom
  const el = e.target; //qualquer elemento que for clicado vai ser o e.target, 'alvo'
  const tag = el.tagName.toLowerCase() //tag vai ser o elemento alvo que foi clicado, vai checar sua tag, bota-la tudo em minusculo, e vai especificar dizendo que é a tag 'a', que é link

  if(tag === 'a'){ //se a tag for 'a', executa a ação... pra nao ficar tudo dentro de uma função, dentro dessa ação vai ter um método 
    e.preventDefault(); //faz com que não seja direcionado pro link caso seja clicado em algum link, pois não queremos o redirecionamento e sim fazer uma requisição 
    carregaPagina(el);// executa o carregaPagina, que vai ser criado e passa como argumento o link que foi clicado... mas pq o link? pq nesse link que for clicado, o conteudo dele é o que queremos, ai assim podemos pegar o conteudo tendo o link 
  }
})

 async function carregaPagina(el){ //recebe o link aqui, mas pq receber ele aqui? simples, pois como queremos o conteúdo desse link, no caso o q tem no seu html escrito, ai vamos pegar seu valor

  try{
    const href = el.getAttribute('href'); //aqui na const href já temos o a(link) clicado e pegamos o atributo href dele
    //console.log(href); //quando clicar no link, vamos ter o href desse link, e tendo o href, podemos fazer a requisição
    const resposta = await fetch(href); //executa primeiro essa funcao fetch e espera ela concluir(passa por parametro pra ela o href do elemento q foi clicado, por exemplo, se foi clicado em pagina1, passa pagina1.html)
    if(resposta.status !== 200) throw new Error('meu erro lançado');
    const html = await resposta.text(); //como é uma promise tb, tem q esperar seu resultado, se concluido, envia pra carregaResultado já com o conteudo html na referencia
    carregaResultado(html)
  
  }catch(e){
    console.error(e)
  }


function carregaResultado(response){ //recebe como aprametro vindo do sucesso do request, o conteudo do link que foi clicado, por exemplo, se cliquei na pagina 1, vai vir pra ca o conteudo html da pagina1
  const divResultado = document.querySelector('.resultado')//seleciono a div resultado que criamos no html para jogar dentro dela o response, que é o conteúdo 
  divResultado.innerHTML = response; //bota o response, que  é o conteudo, pra nova div resultado
}

 }

