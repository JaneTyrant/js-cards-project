'use strict';

const cardsSection = document.getElementById("cards-section");
const cardsContainer = document.getElementById("cards-container");

fetch('./assets/js/data.json')
    .then((response) => response.json())
    .then((actors) => {
        const HTMLCollectionActors = actors
            .filter((actor) => actor.firstName && actor.lastName && actor.profilePicture)
            .map((actor) => createActorsCard(actor));
        cardsContainer.append(...HTMLCollectionActors);
    })
    .catch(() => {
    })

function createActorsCard(actor) {
  const { id, firstName, lastName, profilePicture, contacts } = actor;
  const actorName = firstName && lastName ? `${firstName} ${lastName}` : "Anonim";
  const spanItemSocialLink = createElement('span', {classNames: ['color-secondary', 'fa', 'fa-facebook-f', 'fa-stack-1x', 'fa-xs']} );
  const spanCircleSocialLink = createElement('span', {classNames: ['fa', 'fa-circle', 'fa-stack-2x']} );
  const socialLink = createElement('a', {classNames: ['fa-stack', 'fa-sm'], attributes: {href: contacts}}, spanCircleSocialLink, spanItemSocialLink );
  const actorsName = createElement('p', {classNames: ['actors-name'], attributes: {'id': id}}, actorName );
  const cardPhoto = createElement('img', {classNames: ['card-photo'], attributes:{"src": profilePicture, "alt": actorName}, events:{error: handlePhotoError, "load": handlePhotoLoad}} );
  const initialsWrapper = createElement('div', {classNames: ['initials-wrapper', 'color-secondary'], name: [firstName, lastName]} );
  const photoWrapper = createElement('div', {classNames: ['photo-wrapper']}, initialsWrapper, cardPhoto );
  const cardArticle = createElement('article', {classNames: ['card-article']}, photoWrapper, actorsName, socialLink );
  return cardArticle;
}

function getInitials(array) {
  return array.toString().toUpperCase().split(",").map((string) => string.slice(0, 1)).join("") || 'NN';
}

function handlePhotoError({ target }) {
  target.remove();
}

function handlePhotoLoad({ target }) {
  target.classList.add('background-color');
}

function stringToColour(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).slice(-2);
  }
  return colour;
}