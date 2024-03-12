const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardData, onDelete) {
    const cardElement = cardTemplate.cloneNode(true).children[0];
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        onDelete(cardElement);
    });

    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function renderCards(cards) {
    cards.forEach(card => {
        const cardElement = createCard(card, deleteCard);

        placesList.append(cardElement);
    });
}

renderCards(initialCards);