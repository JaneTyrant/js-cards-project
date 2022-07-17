"use strict";

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
