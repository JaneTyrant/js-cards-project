"use strict";

socialMap.set("www.facebook.com", "fa-facebook-f");
socialMap.set("twitter.com", "fa-twitter");
socialMap.set("www.instagram.com", "fa-instagram");

fetch("./assets/js/data.json")
  .then((response) => response.json())
  .then((actors) => {
    const HTMLCollectionActors = actors
      .filter(
        (actor) => actor.firstName && actor.lastName && actor.profilePicture
      )
      .map((actor) => createActorsCard(actor));
    cardsContainer.append(...HTMLCollectionActors);
    cardsSection.append(createChosenContainer());
  })
  .catch(() => {
    cardsContainer.append(createErrorMessage());
  });