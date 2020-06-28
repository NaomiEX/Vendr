class Product {
  constructor(
    id,
    ownerId,
    title,
    price,
    thumbnail,
    productImages,
    description,
    categories,
    rating,
    views
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.productImages = productImages;
    this.description = description;
    this.categories = categories;
    this.rating = rating;
    this.views = views;
  }
}

export default Product;
