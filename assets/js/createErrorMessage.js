"use strict";

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