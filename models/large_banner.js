class LargeBanner {
  // banners will have attached text such as "Discounts on tech up to 90%", Discounts on tech is the title, and 90% is the emphasis
  constructor(
    id,
    imageUrl,
    imageTextUrl,
    headerBackground,
    headerIcon,
    headerText,
    headerSubtitle,
    headerSubtitleWidth
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.imageTextUrl = imageTextUrl;
    this.headerBackground = headerBackground;
    this.headerIcon = headerIcon;
    this.headerText = headerText;
    this.headerSubtitle = headerSubtitle;
    this.headerSubtitleWidth = headerSubtitleWidth;
  }
}

export default LargeBanner;
