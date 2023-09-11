
const imagesWrapper=document.querySelector(".images")
const loadmorebtn=document.querySelector(".loadmore")
const searchbox=document.querySelector(".searchbox input")
const lightbox=document.querySelector(".lightbox")
const apiKey="oOnSaJeMok7Uiucny2aPpvIUUkBLSfoHGsLeUP8hFfo1FDBE6SNPF2LG";
const perPage=15;
let currentPage=1;
let searchTrem=null;
const downloadImg= (imgURL)=>{
fetch(imgURL).then(res =>res.blob()).then(file=>{
    const a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download=new Date().getTime();
    a.click();
}).catch(()=>alert("Failed to Download Image"));
}

    

const generateHTML=(images)=>{
    imagesWrapper.innerHTML+= images.map(img=>
            `<li class="card" onclick="showLightbox('${img.photographer}','${img.src.large2x}')">
                <img src="${img.src.large2x}  " alt="img">
              <div class="detail">
                    <div class="photo">
                        <i class="fa-solid fa-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                    
                    <button onclick="downloadImg('${img.src.large2x}',)">
                    <i class="fa-solid fa-download">
                    </i></button>
           </div>
            </li>`
        ).join("")
}
const getImages=(apiUrl)=>{
    //fectching image by authorisation header api
    loadmorebtn.innerText="loading....";
    loadmorebtn.classList.add("disabled");
   fetch(apiUrl,{
        headers:{Authorization:apiKey}
    }).then(res=> res.json()).then(data =>{
            generateHTML(data.photos)
            loadmorebtn.innerText="load more....";
            loadmorebtn.classList.remove("disabled");
    }).catch(()=>alert("failed to load image"));
}
const loadmoreImages=()=>{
    currentPage++;
    let apiUrl=`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    apiUrl=searchTrem ?`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`:apiUrl;
    getImages(apiUrl);
    
}
const loadsearchImages=(e)=>{
    if(e.target.value==="" )return searchTrem=null
if(e.key==="Enter"){
    currentPage=1;
    searchTrem=e.target.value;
    imagesWrapper.innerHTML="";
    getImages(`https://api.pexels.com/v1/search?query=${searchTrem}&page=${currentPage}&per_page=${perPage}`);
}
}
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)
loadmorebtn.addEventListener("click",loadmoreImages);
searchbox.addEventListener("keyup",loadsearchImages);
