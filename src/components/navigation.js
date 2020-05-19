import {createMarkup, mergeData, setId} from '../util.js';

const MAX_FILTER_RESULTS_COUNT_TO_DISPLAY = 5;
const ALL_MOVIES_ID = `all`;

const createNavigationItemMarkup = function ({name, id, count = 0}, isActive = false) {
  return (
    `<a href="#${id || setId(name)}"
      class="main-navigation__item${isActive ? ` main-navigation__item--active` : ``}">
      ${name}
      ${(count > MAX_FILTER_RESULTS_COUNT_TO_DISPLAY || id === ALL_MOVIES_ID) ? ``
      : ` <span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

export const createNavigationTemplate = (counts) => {
  const navItems = [
    {name: `All movies`, id: ALL_MOVIES_ID},
    {name: `Watchlist`},
    {name: `History`},
    {name: `Favorites`}];

  const data = mergeData(navItems, counts);
  const navItemsMarkup = createMarkup(data, createNavigationItemMarkup, 0);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navItemsMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};