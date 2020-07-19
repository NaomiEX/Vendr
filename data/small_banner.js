import SmallBanner from "../models/small_banner";

export const SMALL_BANNERS = [
  new SmallBanner(
    "vinyl_record",

    require("../assets/small_banner/Vinyl_Record.png"),
    require("../assets/small_banner/Vinyl_Record_Text.png"),
    require("../assets/sales/background/vinyl_record_background.png"),
    require("../assets/sales/icon/vinyl_record_icon.png"),
    "Record Sale",
    "Want to increase your vinyl record collection? Never bought a vinyl record before? Get one here!",
    247
  ),

  new SmallBanner(
    "accessory",
    require("../assets/small_banner/Accessory.png"),
    require("../assets/small_banner/Accessory_Text.png"),
    require("../assets/sales/background/accessories_background.png"),
    require("../assets/sales/icon/accessories_icon.png"),
    "Accessories Discount",
    "Treat yourself with these stunning accessories, with discounts up to 90%*",
    242
  ),

  new SmallBanner(
    "school_supplies",
    require("../assets/small_banner/School_Supplies.png"),
    require("../assets/small_banner/School_Supplies_Text.png"),
    require("../assets/sales/background/school_supplies_background.png"),
    require("../assets/sales/icon/school_supplies_icon.png"),
    "Back to School Sale",
    "Ready to go back to school? No? Don't worry we have all the school necessities right here!",
    261
  ),
];
