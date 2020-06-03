import LargeBanner from "../models/large_banner";

export const LARGE_BANNERS = [
  new LargeBanner(
    "l1",
    require("../assets/large_banner/Final_Tech.png"),
    require("../assets/large_banner/Tek_Text.png")
  ),
  new LargeBanner(
    "l2",
    require("../assets/large_banner/Winter_Apparel.png"),
    ""
  ),
];
