"use strict";

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
