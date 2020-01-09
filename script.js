
function getProducts(){
	 const url = 'https://api.myjson.com/bins/lgoee'
	 var xmlhttp = new XMLHttpRequest();
	  xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            bindData(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
let imagesData = [];
function bindData(data){
	const productEle = document.getElementById('products');
	const{groups} = data;
	groups.forEach((group)=>{
		const{hero:{href}, name, priceRange:{regular}, images} = group;
		var divEle = document.createElement('div');
		divEle.classList.add('products_list');
		productEle.appendChild(divEle);
		divEle.addEventListener('click', function(){
			imagesData = [...images];
			openCauroselModal(images);
		});
	    divEle.innerHTML+= '<img class="hero_image" src='+href+' />'+ '<span class="title">'+name+'</span>' + '<span class="price">'+'$ '+regular.high+'</span>' ;
	});

}
function openCauroselModal(images){
	document.getElementsByClassName('fa-chevron-left')[0].style.display = 'none';
		 document.getElementsByClassName('fa-chevron-right')[0].style.display = 'none';
	document.getElementById('modal').style.display = 'block';
	if(images.length>1){
		const imagesDiv =  document.getElementById('images');
		var indicators = document.createElement('div');
		indicators.classList.add('circles');
		images.forEach((img, key)=>{
			indicators.innerHTML+= '<span class="circle"></span>';
			imagesDiv.appendChild(indicators);
		});
		 document.getElementsByClassName('fa-chevron-left')[0].style.display = 'block';
		 document.getElementsByClassName('fa-chevron-right')[0].style.display = 'block';
	}

	addlistElement(images, 0);
	
}
function addlistElement(images, count){
	const imagesDiv =  document.getElementById('images');
	const ul = document.createElement('ul');
	ul.classList.add('lists');
	imagesDiv.appendChild(ul);
		const li = document.createElement('li');
		li.classList.add('img');
		li.innerHTML+='<img class="modal_img" src='+images[count].href+' />';
		ul.appendChild(li);
		const circles = document.getElementsByClassName('circle');
		for(var i=0; i<circles.length; i++){
			if(i === count){
				circles[i].classList.add('active');
			}else{
				circles[i].classList.remove('active');
			}
		}
}
function closeModal(){
	 document.getElementsByClassName('lists')[0].remove();
	 if(document.getElementsByClassName('circle').length>0){
	 	 document.getElementsByClassName('circles')[0].remove();
	 }
	
	document.getElementById('modal').style.display = 'none';
}
var count = 0;
function next(){
	 document.getElementsByClassName('lists')[0].remove();
	count++;
   if(count === imagesData.length){
   		count  = 0;
   }
   addlistElement(imagesData, count);
}
function prev(){
	 document.getElementsByClassName('lists')[0].remove();
	if(count === 0){
		count = imagesData.length-1;
	}else{
		count--;
	}
	addlistElement(imagesData, count);
}
