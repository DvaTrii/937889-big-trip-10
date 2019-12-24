const EVENTS_AMOUNT = 10;
const OFFERS_AMOUNT = 3;

const mock = {
  offers: [
    {
      type: `luggage`,
      title: `Add luggage`,
      price: `10`,
      checked: `true`
    },
    {
      type: `comfort`,
      title: `Switch to comfort class`,
      price: `150`,
      checked: `false`
    },
    {
      type: `meal`,
      title: `Add meal`,
      price: `12`,
      checked: `false`
    },
    {
      type: `seats`,
      title: `Choose seats`,
      price: `5`,
      checked: `true`
    },
    {
      type: `train`,
      title: `Travel by train`,
      price: `35`,
      checked: `false`
    }
  ],
  cities: [`Amsteradam`, `Geneva`, `Paris`, `Milan`, `Roma`, `Lisbon`, `Barcelona`, `Valencia`, `Munster`],
  type: [`bus`, `check-in`, `drive`, `flight`,
    `restaurant`, `ship`, `sightseeing`,
    `taxi`, `train`, `transport`, `ship`],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `In rutrum ac purus sit amet tempus.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`
  ],
};

const getRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min)) + min;
};

const mixArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getRandomDescription = () => {
  return mixArray(mock.description)
    .slice(0, getRandomNumber(1, 4))
    .join(` `);
};

// const getRandomDescription = (array) => {
//   let fullDescription = [];
//   for (let i = 0; i <= Math.random() * 2; i++) {
//     fullDescription[i] = array[Math.floor(Math.random() * (array.length - 1))];
//     fullDescription.push(fullDescription[i]);
//   }
//   return fullDescription.join(` `);
// };

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * (arr.length - 1))];

const getRandomDate = () => {
  return (
    Date.now() + 10 + Math.floor(Math.random() * 7) * 24 * getRandomNumber(0, 60) * 60 * 1000
  );
};

const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

// const getRandomOffers = (array, amount = getRandomNumber(0, 2)) => {
//   let offers = [];
//   for (let i = 0; i <= amount; i++) {
//     offers[i] = array[Math.floor(Math.random() * (array.length - 1))];
//     offers.push(offers[i]);
//   }
//   return new Set(offers);
// };

const generateTripEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();
  return {
    type: getRandomArrayItem(mock.type),
    place: getRandomArrayItem(mock.cities),
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomNumber(5, 120),
    offers: mixArray(mock.offers).slice(0, OFFERS_AMOUNT),
    description: getRandomDescription(),
    photos: Array(4)
      .fill(``)
      .map(getRandomPhoto)
  };
};

const generateTripEvents = (amount) => {
  return Array(amount)
    .fill(``)
    .map(() => generateTripEvent())
    .sort((prevCard, nextCard) => prevCard.startDate - nextCard.startDate);
};

export const tripEvents = generateTripEvents(EVENTS_AMOUNT);

