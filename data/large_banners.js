import LargeBanner from "../models/large_banner";

export const LARGE_BANNERS = [
  new LargeBanner(
    "l1",
    require("../assets/large_banner/Summer_Apparel.png"),
    require("../assets/large_banner/Summer_Apparel_Text.png")
  ),
  new LargeBanner(
    "l2",
    require("../assets/large_banner/Tech.png"),
    require("../assets/large_banner/Tech_Text.png")
  ),
  new LargeBanner(
    "l3",
    require("../assets/large_banner/Art.png"),
    require("../assets/large_banner/Art_Text.png")
  ),
];
