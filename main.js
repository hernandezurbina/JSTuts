var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

var storyText = "It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments,";
var insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
var insertY = ["the soup kitchen", "Disneyland", "the White House"];
var insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

randomize.addEventListener('click', result);

function result() {
	var newStory = storyText;
	var xItem = randomValueFromArray(insertX);
	var yItem = randomValueFromArray(insertY);
	var zItem = randomValueFromArray(insertZ);

	newStory = newStory.replace(":insertx:", xItem);
	newStory = newStory.replace(":inserty:", yItem);
	newStory = newStory.replace(":insertZ:", zItem);
  
  if(customName.value != '') {
    var name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if(document.getElementById("uk").checked) {
    var weight = Math.round(300 / 14) + ' stone';
    var temperature =  Math.round((94 - 32) * 0.5556) + ' centigrade';
    
    newStory = newStory.replace("94 farenheit", temperature);
    newStory = newStory.replace("300 pounds", weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

