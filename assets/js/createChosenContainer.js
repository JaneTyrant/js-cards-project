"use strict";

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