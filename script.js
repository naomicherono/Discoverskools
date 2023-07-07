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

// Display cards based on gender in the specified container
function displayCards(schools, gender, containerId) {
  const cardsContainer = document.getElementById(containerId);
  
  // Filter schools by gender
  const filteredSchools = schools.filter(school => school.gender === gender);
  
  // Create and append card elements for each filtered school
  filteredSchools.forEach(school => {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = school.image;
    card.appendChild(image);

    const button = document.createElement('button');
    button.textContent = 'View More';
    button.addEventListener('click', () => openModal(school));
    card.appendChild(button);
    
    cardsContainer.appendChild(card);
  });
}

