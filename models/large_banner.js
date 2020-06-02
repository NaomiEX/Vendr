class LargeBanner {
  // banners will have attached text such as "Discounts on tech up to 90%", Discounts on tech is the title, and 90% is the emphasis
  constructor(id, title, emphasis, imageUrl) {
    this.id = id;
    this.title = title;
    this.emphasis = emphasis;
    this.imageUrl = imageUrl;
  }
}

export default LargeBanner;
