//==============================
// HERO AUTO SLIDER
//==============================

const heroImages=[
"assets/images/hero1.jpg",
"assets/images/hero2.jpg",
"assets/images/hero3.jpg"
];

let current=0;

setInterval(()=>{

current++;

if(current>=heroImages.length){

current=0;

}

document.querySelector(".hero").style.backgroundImage=
`linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.7)),url(${heroImages[current]})`;

},4000);


//==============================
// LIVE SEARCH
//==============================

const search=document.querySelector("input[type='text']");

if(search){

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".product").forEach(product=>{

product.style.display=

product.innerText.toLowerCase().includes(value)

?

"block"

:

"none";

});

});

}


//==============================
// LOADING SCREEN
//==============================

window.onload=function(){

let loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

}