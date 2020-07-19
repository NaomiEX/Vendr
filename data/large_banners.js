import LargeBanner from "../models/large_banner";

export const LARGE_BANNERS = [
  new LargeBanner(
    "summer",
    require("../assets/large_banner/Summer_Apparel.png"),
    require("../assets/large_banner/Summer_Apparel_Text.png"),
    require("../assets/sales/background/summer_background.png"),
    require("../assets/sales/icon/summer_icon.png"),
    "Summer Sale",
    "Getting ready for the blazing sun and the cool beaches? Get all your summer apparel here!",
    247
  ),
  new LargeBanner(
    "tech",
    require("../assets/large_banner/Tech.png"),
    require("../assets/large_banner/Tech_Text.png"),
    require("../assets/sales/background/tech_background.png"),
    require("../assets/sales/icon/tech_icon.png"),
    "Tech Discount",
    "Discounts up to 90%* on the selected tech gadgets, widgets, and accessories",
    268
  ),
  new LargeBanner(
    "art",
    require("../assets/large_banner/Art.png"),
    require("../assets/large_banner/Art_Text.png"),
    require("../assets/sales/background/art_background.png"),
    require("../assets/sales/icon/art_icon.png"),
    "Art Discount",
    "Tired of your plain-old room? Hang some paintings, decorate with fairy lights and add some greenery!",
    246
  ),
];
