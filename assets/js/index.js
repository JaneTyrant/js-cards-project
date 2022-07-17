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

/**
 *
 * @param {object} actor
 * @returns {element}
 */
function createActorsCard(actor) {
  console.log(actor);
  const { id, firstName, lastName, profilePicture, contacts } = actor;
  const actorName =
    firstName && lastName ? `${firstName} ${lastName}` : "Anonim";
  const socials = contacts.map((contact) => {
    const hostName = new URL(contact).hostname;
    const spanCircleSocialLink = createElement("span", {
      classNames: ["fa", "fa-circle", "fa-stack-2x"],
    });
    const spanItemSocialLink = createElement("span", {
      classNames: [
        "color-secondary",
        "fa",
        socialMap.get(hostName),
        "fa-stack-1x",
        "fa-xs",
      ],
    });
    const socialLink = createElement(
      "a",
      { classNames: ["fa-stack", "fa-sm"], attributes: { href: contact } },
      spanCircleSocialLink,
      spanItemSocialLink
    );
    return socialLink;
  });
  const actorsName = createElement(
    "p",
    { classNames: ["actors-name"], attributes: { id: id, "data-id": id } },
    actorName
  );
  const cardPhoto = createElement("img", {
    classNames: ["card-photo"],
    attributes: { src: profilePicture, alt: actorName, "data-id": id },
    events: { error: handlePhotoError, load: handlePhotoLoad },
  });
  const initialsWrapper = createElement("div", {
    classNames: ["initials-wrapper", "color-secondary"],
    attributes: { "data-id": id },
    name: [firstName, lastName],
  });
  const photoWrapper = createElement(
    "div",
    {
      classNames: ["photo-wrapper"],
      attributes: { "data-id": id, id: `wrapper-id-${id}` },
    },
    initialsWrapper,
    cardPhoto
  );
  const cardArticle = createElement(
    "article",
    {
      classNames: ["card-article"],
      attributes: { "data-id": id },
      events: { click: handleArticle },
    },
    photoWrapper,
    actorsName,
    ...socials
  );
  return cardArticle;
}

/**
 *
 * @returns {element}
 */
function createChosenContainer() {
  const actorsName = createElement("li", { classNames: ["actors-name"] });
  const chosenList = createElement(
    "ul",
    { classNames: ["chosen-list"], attributes: { id: "chosen-list" } },
    actorsName
  );
  const heading = createElement(
    "h2",
    { classNames: ["heading"] },
    document.createTextNode("you choosed")
  );
  const chosenContainer = createElement(
    "div",
    { classNames: ["chosen-container"] },
    heading,
    chosenList
  );
  return chosenContainer;
}

/**
 *
 * @returns {element}
 */
function createErrorMessage() {
  const errorMessageContent3 = createElement(
    "p",
    { classNames: ["error-message-content"] },
    document.createTextNode("We'll fix this page soon.")
  );
  const errorMessageContent2 = createElement(
    "p",
    { classNames: ["error-message-content"] },
    document.createTextNode("Please try again later!")
  );
  const errorMessageContent1 = createElement(
    "p",
    { classNames: ["error-message-content"] },
    document.createTextNode("Sorry, this page is temporarily unavailable.")
  );
  const errorHeading = createElement(
    "h2",
    { classNames: ["heading", "error-heading"] },
    document.createTextNode("Oops! Something went wrong!")
  );
  const errorMessage = createElement(
    "div",
    { classNames: ["error-message-container"] },
    errorHeading,
    errorMessageContent1,
    errorMessageContent2,
    errorMessageContent3
  );
  console.log(errorMessage);
  return errorMessage;
}

/**
 * Creates the initials of the first two strings of an array.
 * @param {array} array
 * @returns {string}
 */
function getInitials(array) {
  return (
    array
      .toString()
      .toUpperCase()
      .split(",")
      .map((string) => string.slice(0, 1))
      .join("") || "NN"
  );
}

/**
 * Removes the icon of the picture in case of an error.
 * @param {object} { target }
 */
function handlePhotoError({ target }) {
  target.remove();
}

/**
 * Adds background-color and appends an image when it's loaded.
 * @param {object} { target }
 */
function handlePhotoLoad({ target }) {
  target.classList.add("background-color");
  document.getElementById(`wrapper-id-${target.dataset.id}`).append(target);
}

/**
 * Once adds the name of the actor to the chosen list by clicking on the article.
 * @param {object} { target }
 */
function handleArticle({ target }) {
  const actorsName = document.getElementById(target.dataset.id).textContent;
  if (!actorsNames.includes(actorsName)) {
    actorsNames.push(actorsName);
    const actorsNameItem = createElement(
      "li",
      { classNames: ["actors-name"] },
      actorsName
    );
    const chosenList = document.getElementById("chosen-list");
    chosenList.append(actorsNameItem);
  }
}

/**
 * Converts string to name.
 * @param {string} string
 * @returns {string}
 */
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
