// Capturando os 3 campos da tela.
let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnEntrar = document.getElementById('btn-entrar');

const emailBanco = "admin@admin.com";
const senhaBanco = "123456";

// Aqui capturo o evento de click para tomar uma ação qualquer
btnEntrar.addEventListener('click', () =>{

    // 1º Pegar o email digitado.
    let userEmail = email.value;

    // 2º Pegar a senha digitada.
    let userSenha = senha.value;

    // 3º Validar se o email e senha estão corretos.
    if(!userEmail || !userSenha){
       
        Swal.fire({
            icon: 'error',
            text: 'Os campos de e-mail e senha são obrigatórios!',
          });
          
       // alert ("Os campos de e-mail e senha são obrigatórios!");
        return;
    }
    // 4º Aqui precisamos enviar esse email e senha ao backend para saber se o usuario pode 
     autenticar(userEmail, userSenha);

    // 5º Caso esteja correto, ir para tela de cadastro de usuario.

});


function autenticar(email, senha){
  const urlBase = `http://localhost:3400`;
  fetch(`${urlBase}/login`, {
   method:'POST',
   headers:{
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({email, senha})
  })
  .then(response => response = response.json())
  .then(response => {
      if(!!response.mensagem){
       alert(response.mensagem);
       return;
      }else{
        
      // alert("Usuario autenticado com sucesso!");
       
       salvarToken(response.token);
       salvarUsuario(response.usuario);
       

       window.open('controle-cliente.html', '_self');
      }
   });
}
