const EVENTS_AMOUNT = 10;
const OFFERS_AMOUNT = 3;

const mock = {
  offers: [
    {
      offerType: `luggage`,
      title: `Add luggage`,
      offerPrice: `10`,
      isChecked: true
    },
    {
      offerType: `comfort`,
      title: `Switch to comfort class`,
      offerPrice: `15`,
      isChecked: true
    },
    {
      offerType: `meal`,
      title: `Add meal`,
      offerPrice: `12`,
      isChecked: false
    },
    {
      offerType: `seats`,
      title: `Choose seats`,
      offerPrice: `5`,
      isChecked: true
    },
    {
      offerType: `train`,
      title: `Travel by train`,
      offerPrice: `35`,
      isChecked: true
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

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * (arr.length - 1))];

const getRandomDate = () => {
  return (
    Date.now() + 10 + Math.floor(Math.random() * 7) * 24 * getRandomNumber(0, 60) * 60 * 1000
  );
};

const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const generateTripEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    type: getRandomArrayItem(mock.type),
    place: getRandomArrayItem(mock.cities),
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomNumber(5, 120),
    offers: mixArray(mock.offers).slice(0, OFFERS_AMOUNT),
    description: getRandomDescription(),
    isFavorite: Math.random() > 0.5,
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
export const CITIES = mock.cities;
