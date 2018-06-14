
const width = window.innerWidth;
const height = window.innerHeight;

let life = 5;

function createSquare(){
  let square = document.createElement('div');
  let size = Math.floor(((Math.random()*100+1)+25));
  square.style.height = `${size}px`;
  square.style.width = `${size}px`;
  square.style.background = `rgb(${Math.floor(Math.random()*255+1)},${Math.floor(Math.random()*255+1)},${Math.floor(Math.random()*255+1)})`;
  square.style.position = 'absolute';
  square.style.cursor = 'pointer';
  square.style.left = `${Math.floor(((Math.random()*(`${width}`- 2*`${size}`+1) +`${size}`)))}px`;
  square.style.top = `${Math.floor(((Math.random()*(`${height}`- 2*`${size}`+1 ) +`${size}`)))}px`;
  let id = `${(Math.random()*10).toFixed(0)}${(Math.random()*10).toFixed(0)}${(Math.random()*10).toFixed(0)}`
  square.setAttribute("id",id);
  let fixing = document.getElementById('board');
  fixing.appendChild(square);

  //let s = setTimeout(function(){createSquare();}, 3000);

  fixing.addEventListener('click',function(){
	life--;
	let lifeCounter = document.querySelector("#life");
	lifeCounter.innerHTML = `Życie: ${life}`
  },false);


  square.addEventListener('click',function(e){
	  e.preventDefault();
	  e.stopPropagation();
	  remove(id);

  },false);
};

function remove(id){
	//clearTimeout();
  let elRemove = document.getElementById(id);
  elRemove.parentNode.removeChild(elRemove);
  createSquare();
}



function setup(){
let board = document.getElementById('board');
board.style.width = `${width}px`;
board.style.height = `${height}px`;
createSquare();
}
window.addEventListener('load',setup,false);
