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


// Open modal with school details
function openModal(school) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalAdmission = document.getElementById('modal-admission');
  const modalFees = document.getElementById('modal-fees');
  const modalCurriculum = document.getElementById('modal-curriculum');
  const modalContacts = document.getElementById('modal-contacts');
  const modalWebsite = document.getElementById('modal-website');

  modalTitle.textContent = school.name;
  modalAdmission.textContent = 'Admission Requirements: ' + school.admission;
  modalFees.textContent = 'Fees: ' + school.fees + ' KES';
  modalCurriculum.textContent = 'Curriculum: ' + school.curriculumn;
  modalContacts.textContent = 'Contact Details: ' + school.contact_number;
  modalWebsite.innerHTML = '<a href="' + school.website + '" target="_blank">Visit Website</a>';

  modal.style.display = 'block';

  const modalClose = document.getElementById('modal-close');
  modalClose.addEventListener('click', closeModal);

  window.addEventListener('click', outsideClick);
}


// Close modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  window.removeEventListener('click', outsideClick);
}

// Close modal if clicked outside of it
function outsideClick(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    modal.style.display = 'none';
    window.removeEventListener('click', outsideClick);
  }
}
