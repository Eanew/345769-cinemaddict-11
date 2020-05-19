const setRank = (movies) => {
  const Rank = {
    'Movie Buff': 21,
    'Fan': 11,
    'Novice': 1,
  };

  for (const count in Rank) {
    if (Rank.hasOwnProperty(count) && Rank[count] <= movies) {
      return count;
    }
  }
  return null;
};

export const createUserLevelTemplate = ({avatar, movies}) => {
  const rank = setRank(movies);

  return (
    `<section class="header__profile profile">
      ${rank ? `<p class="profile__rating">${rank}</p>` : ``}
      <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};