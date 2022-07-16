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

  const actorsName = createElement('p', {classNames: ['actors-name']}, actorName );

  const cardPhoto = createElement('img', {classNames: ['card-photo'], attributes:{"src": profilePicture, "alt": actorName}});

  const initialsWrapper = createElement('div', {classNames: ['initials-wrapper', 'color-secondary'], name: [firstName, lastName]} );

  const photoWrapper = createElement('div', {classNames: ['photo-wrapper']}, initialsWrapper, cardPhoto );

  const cardArticle = createElement('article', {classNames: ['card-article']}, photoWrapper, actorsName, socialLink );

  return cardArticle;
}