const postContainer = document.querySelector('.post-container')
const loading = document.querySelector('#loader')
const inputFilter = document.querySelector('#filter')
const buttonSearch = document.querySelector('#search')


let firstCall = true;


let limite = 20

let pagina = 1



const getPosts = async() => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=${limite}`)
    const data = await resp.json();

    return data;
};
const pintarPost = (posteitos) => {
    
    firstCall = false;
    const posteosHtml = posteitos.map ((valor)=>{
    return `<div class="post">
    <div class="numerito">${valor.id}</div>
    <div class="post-info">
        <h2 class="post-title">${valor.title}</h2>
        <p class="post-body">${valor.body}</p>
    </div>
</div>

</div>`
})
.join('');
postContainer.innerHTML += posteosHtml;


}


buttonSearch.addEventListener('click',() => {if(firstCall === true)
    {
        startPost()
        firstCall =false
    }else {console.log('solo puedes usar el boton 1 vez');}})

function startLoader () {
    document.querySelector('#loader').style.opacity = 1;
    
}
function finishLoader () {
    document.querySelector('#loader').style.opacity = 0;
}

async function startPost() {
        let posts = await getPosts()
        pintarPost(posts)
        if((100/limite) >=pagina){
            pagina = pagina +1;
        }else {pagina = Math.floor(Math.random()*5)+1;
            limite = Math.floor(Math.random()*5)+1
        }
        
}

window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;  if (bottomOfWindow) {
        startLoader();
        
      setTimeout(function() {
        finishLoader()
        startPost();},1500)
    }
  };



// TAREA
// Pasos a seguir 
// 1- quiero que detecte cuando llego a abajo de todo
// 2- cuando llego abajo de todo, quiero que muestre el loading
// 3- despues, que me cargue otros 5 post y los agregue
// 3-a-cuando llego al final, me cambie dinamicamente las variables pagina y limite.