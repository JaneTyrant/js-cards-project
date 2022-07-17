"use strict";

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
