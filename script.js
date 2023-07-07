var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}


// Fetch data from 'db.json' and process it
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    displayCards(data.schools, 'boys', 'boys-cards-container');
    displayCards(data.schools, 'girls', 'girls-cards-container');
    displayCards(data.schools, 'international', 'international-cards-container');
  });