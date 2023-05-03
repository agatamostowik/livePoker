import _ from "lodash";

export const formatCardNames = (cards: string[]) => {
  return cards.map((card) => {
    return card.replace("_", "");
  });
};

export const drawCard = (initialCards: string[]) => {
  const drawnCard =
    initialCards[Math.floor(Math.random() * initialCards.length)];
  const cards = initialCards.filter((cart) => cart !== drawnCard);

  return { drawnCard, cards };
};

export const drawTwoCards = (cards: string[]) => {
  const { drawnCard: firstCard, cards: firstDrawCards } = drawCard(cards);
  const { drawnCard: secondCard, cards: restCards } = drawCard(firstDrawCards);

  return { drawnCards: [firstCard, secondCard], cards: restCards };
};

export const drawThreeCards = (cards: string[]) => {
  const { drawnCard: firstCard, cards: firstDrawCards } = drawCard(cards);
  const { drawnCard: secondCard, cards: secondDrawCards } =
    drawCard(firstDrawCards);
  const { drawnCard: thirdCard, cards: restCards } = drawCard(secondDrawCards);

  return { drawnCards: [firstCard, secondCard, thirdCard], cards: restCards };
};

export const trim = (word: string) => {
  return word.split(",")[0];
};
