var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for(var i = 1; i <= 5; i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic'+ i + '.jpg');
  thumbBar.appendChild(newImage);
  newImage.onclick = function(event){
  	imgSrc = event.target.getAttribute('src');
  	displayImage(imgSrc);
  }
}

function displayImage(imgSrc){
	displayedImage.setAttribute('src', imgSrc);
}
/* Wiring up the Darken/Lighten button */
btn.onclick = function(event){
	currClass = event.target.getAttribute('class');
	//console.log(currClass);
	if(currClass === 'dark'){
		event.target.setAttribute('class','light');
		event.target.textContent = 'Lighten';
		overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
	}
	else{
		event.target.setAttribute('class','dark');
		event.target.textContent = 'Darken';
		overlay.style.backgroundColor = 'rgba(0,0,0,0)';
	}
}
