import SmallBanner from "../models/small_banner";

export const SMALL_BANNERS = [
  new SmallBanner(
    "s1",
    require("../assets/small_banner/Vinyl_Record.png"),
    require("../assets/small_banner/Vinyl_Record_Text.png")
  ),

  new SmallBanner(
    "s2",
    require("../assets/small_banner/Accessory.png"),
    require("../assets/small_banner/Accessory_Text.png")
  ),

  new SmallBanner(
    "s3",
    require("../assets/small_banner/School_Supplies.png"),
    require("../assets/small_banner/School_Supplies_Text.png")
  ),
];
