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
*/

