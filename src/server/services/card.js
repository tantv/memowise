const uniqueRandomArray = require('unique-random-array');
const Card = require('../models/Card');
const { getPlaysByCard } = require('./play');

exports.getNextCardToPlay = (deckId, userId) =>
  Card.find({ deckId })
    .then((cards) => {
      const MAX_TRIES = 10;
      const getRandomCard = uniqueRandomArray(cards);
      const getProbability = () => Math.random() * 0.5;

      let tries = 0;
      let randomCard = getRandomCard();
      let probability = getProbability();

      const getNextCard = () =>
        getPlaysByCard(randomCard._id, deckId, userId)
          .then((plays) => {
            let totalRating = 0;

            if (plays.length) {
              totalRating = plays.reduce((sum, play) =>
                sum - Number(play.rating), 0);
            } else {
              return randomCard;
            }

            const randomCardProbability = Math.random() * (totalRating ** 2);

            if ((probability > randomCardProbability) && (tries < MAX_TRIES)) {
              randomCard = getRandomCard();
              probability = getProbability();
              tries += 1;
              return getNextCard();
            }

            return randomCard;
          });

      return getNextCard();
    });
