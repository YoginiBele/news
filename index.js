const API_KEY ="4607408a51e5451db9e0f1b000ed314d";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));
function reload(){
  window.location.reload();
}

async function fetchNews (query){
  const res = await fetch(`${url}${query} &apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles){
  const cardsContainer=document.getElementById('cards-container');
  const newsCardTemplate=document.getElementById('template-news-card');

  cardsContainer.innerHTML='';

  articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone=newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone);
  });
  
}
function fillDataInCard(cardClone,article){
  const newsImg =cardClone.querySelector("#news-img");
  const newsTitle =cardClone.querySelector("#news-title");
  const newsSource =cardClone.querySelector("#news-source");
  const newsDescription =cardClone.querySelector("#news-desc");

  newsImg.src=article.urlToImage;
  newsTitle.innerHTML=article.title;
  newsDescription.innerHTML=article.description;

  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timezone:"Asia/Jakarta"
  });


newsSource.innerHTML=`${article.source.name} • ${date}`;

cardClone.firstElementChild.addEventListener("click", () => {
  window.open(article.url, "_blank");
});
}

const curSelectorNav =null;

function onNavItemClick(id){
  fetchNews(id);
  const navItem=document.getElementById(id);
  curSelectorNav?.classList.remove("active");
  curSelectorNav=navItem;
  curSelectorNav.classList.add("active");
}
const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click",() =>{
  const query= searchText.value;
  if(!query) return;
  fetchNews(query);
  curSelectorNav?.classList.remove('active');
  curSelectorNav=null;
});