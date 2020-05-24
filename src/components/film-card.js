import {Regular, createMarkup, createElement, setId, setActiveButtons, getDuration} from '../util.js';

const MAX_DESCRIPTION_LENGTH = 140;

const infoFieldsList = [
  `year`,
  `duration`,
  `genre`];

const controlButtonsList = [
  {name: `Add to watchlist`},
  {name: `Mark as watched`},
  {name: `Mark as favorite`, id: `favorite`}];

const generateInfoFields = (infoFieldsData) => infoFieldsList.map((it, i) => ({
  name: it,
  value: infoFieldsData[i],
}));

const renderInfoFieldMarkup = (infoField) => {
  const {name, value} = infoField;
  return (
    `<span class="film-card__${name}">${value}</span>`
  );
};

const renderControlButtonMarkup = (button, isActive = false) => {
  const {name, id} = button;
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${id || setId(name)}
      ${isActive ? ` film-card__controls-item--active` : ``}">
      ${name}
    </button>`
  );
};

const getDescription = (string) => string.length > MAX_DESCRIPTION_LENGTH
  ? string.replace(string.slice(MAX_DESCRIPTION_LENGTH), Regular.ELLIPSIS)
  : string;

const getYear = (iso) => new Date(Date.parse(iso)).getFullYear();

const FilmCard = function (data) {
  const info = data[`film_info`];
  const year = getYear(info[`release`][`date`]);
  const duration = getDuration(info[`runtime`]);
  const genre = info[`genre`][0];
  const watchlistButtonStatus = data[`user_details`][`watchlist`];
  const watchedButtonStatus = data[`user_details`][`already_watched`];
  const favoriteButtonStatus = data[`user_details`][`favorite`];
  const activeButtons = setActiveButtons([watchlistButtonStatus, watchedButtonStatus, favoriteButtonStatus]);
  const infoFields = generateInfoFields([year, duration, genre]);

  this.title = info[`title`];
  this.poster = info[`poster`];
  this.raiting = info[`total_raiting`];
  this.description = getDescription(info[`description`]);
  this.commentsCount = data[`comments`].length;
  this.buttonsMarkup = createMarkup(controlButtonsList, renderControlButtonMarkup, ...activeButtons);
  this.infoFieldsMarkup = createMarkup(infoFields, renderInfoFieldMarkup);
};

const createCardTemplate = (card) => {

  const {
    title,
    poster,
    raiting,
    description,
    commentsCount,
    infoFieldsMarkup,
    buttonsMarkup
  } = new FilmCard(card);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        ${infoFieldsMarkup}
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${buttonsMarkup}
      </form>
    </article>`
  );
};

export default class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}