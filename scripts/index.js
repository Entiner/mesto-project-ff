
function createCard(cardData, handleDelete) {

  const template = document.querySelector('#card-template').content;
  const cardElement = template.cloneNode(true).querySelector('.places__item');

  
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteIcon = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  
  deleteIcon.addEventListener('click', () => {
    handleDelete(cardElement);
  });

  return cardElement;
}


function renderCards(cardArray) {
  const container = document.querySelector('.places__list');
  
  cardArray.forEach(cardData => {
    const cardElement = createCard(cardData, (card) => {
      card.remove(); 
    });
    container.append(cardElement);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  if (typeof initialCards !== 'undefined') {
    renderCards(initialCards);
  } else {
    console.error('Массив initialCards не найден.');
  }


  const addButton = document.querySelector('.profile__add-button');
  addButton.addEventListener('click', () => {
    const popup = document.querySelector('.popup_type_new-card');
    popup.classList.add('popup_opened');
  });

  const newCardForm = document.forms['new-place'];
  newCardForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const name = newCardForm.elements['place-name'].value;
    const link = newCardForm.elements['link'].value;
    
    addNewCard(name, link);

    newCardForm.reset();
    const popup = document.querySelector('.popup_type_new-card');
    popup.classList.remove('popup_opened');
  });
});


function addNewCard(name, link) {
  const newCard = createCard({ name, link }, (card) => {
    card.remove();
  });
  document.querySelector('.places__list').prepend(newCard);
}
