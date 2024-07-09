import { Routes } from "./routes";

export const Entries = [
  {
    name: "Attractions",
    route: { pathname: Routes.Attractions, params: { type: "Attraction" } },
    image: require("@assets/images/attraction.jpg"),
  },
  {
    name: "Hiking",
    route: Routes.Hiking,
    image: require("@assets/images/hiking.jpeg"),
  }, {
    name: "Food",
    route: { pathname: Routes.Living, params: { type: "Resturants" } },
    image: require("@assets/images/food.jpg"),
  }, {
    name: "Lodgings",
    route: { pathname: Routes.Living, params: { type: "Accommodations" } },
    image: require("@assets/images/lodgings.jpg"),
  }, {
    name: "Experiences",
    route: Routes.Experience,
    // link: 'https://yandex.com/maps/105790/ararat/routes/minibus_480/796d617073626d313a2f2f7472616e7369742f6c696e653f69643d34303135323339393030266c6c3d34342e36353834333625324334302e303334373930266e616d653d34383026723d313838373126747970653d6d696e69627573/?ll=44.635320%2C40.020808&tab=stops&z=10',
    image: require("@assets/images/experience.jpg"),
  }, {
    name: "Events",
    route: Routes.Events,
    image: require("@assets/images/events.jpg"),
  },
];