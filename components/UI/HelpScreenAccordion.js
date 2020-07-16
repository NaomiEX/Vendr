import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { List } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

import Colors from "../../constants/Colors";

const AccordionCategory = (props) => {
  return (
    <List.Accordion
      titleStyle={styles.categoryTitle}
      title={props.categoryTitle}
      id={uuidv4()}
    >
      <List.AccordionGroup>{props.children}</List.AccordionGroup>
    </List.Accordion>
  );
};

const AccordionQuestion = (props) => {
  return (
    <List.Accordion
      titleNumberOfLines={5}
      titleStyle={styles.question}
      title={props.title}
      id={uuidv4()}
    >
      <List.Item
        titleNumberOfLines={100}
        titleStyle={styles.answer}
        title={props.content}
      />
      {props.children}
    </List.Accordion>
  );
};

const ListItem = (props) => {
  return (
    <List.Item
      titleNumberOfLines={100}
      titleStyle={styles.answer}
      title={props.title}
    />
  );
};

const HelpScreenAccordion = (props) => {
  return (
    <List.AccordionGroup>
      <AccordionCategory categoryTitle="General">
        <AccordionQuestion
          title="How do I add items to my wishlist?"
          content="In the products screen, a heart-shaped icon is present on the lower right of the product image(s). If you tap on the icon, the product will be added to your wishlist and the heart icon will change color from gray to pink "
        />
        <AccordionQuestion
          title="Why am I seeing a pencil/edit icon instead of a heart-icon?"
          content="If the product that you are viewing is your own product then it cannot be added into your wishlist. Instead by tapping on the pencil/edit icon, you can edit the product."
        />
        <AccordionQuestion
          title="How do I remove items from my wishlist?"
          content="In the Product Screen you can tap again on the heart which will remove the product from your wishlist (assuming that product already exists in your wishlist)."
        >
          <ListItem title="Another way to remove items from your wishlist is from the wishlist screen itself. on the corner of each product preview is a heart icon which can be tapped to remove that particular item from your wishlist" />
        </AccordionQuestion>
        <AccordionQuestion
          title="How do I comment on a product?"
          content="In the product screen, once you scroll down you will see a text box where you can post your comment on that product"
        />
        <AccordionQuestion
          title="How do I reply to a comment on a product?"
          content="To reply to a comment first tap on the comment and a popup will appear which contains the full comment and at the bottom, there is a textbox which allows you to reply to that comment"
        />
        <AccordionQuestion
          title="Can I send private messages to a user?"
          content="Yes, first navigate to their profile screen. In their profile page there is a section which allows you to send a direct message to that user through this app. Otherwise their email address is also listed there if you prefer to contact them through email."
        />
        <AccordionQuestion
          title="How do I rate a product?"
          content="To add authenticity, you can only rate products which you have bought"
        />
      </AccordionCategory>
      <AccordionCategory categoryTitle="Buyer">
        <AccordionQuestion
          title="How do I add/remove items to/from my cart?"
          content="In the products screen, there is a button which, when tapped, will add that product to your cart. You may also choose to increase/decrease the quantity of that product by tapping the minus/plus icons which appear after at least one of that product has been added to your cart. Increasing/decreasing each item’s quantity can also be done through the cart screen"
        >
          <ListItem title="To remove the product entirely from your cart, navigate to the cart screen and each item can be removed by tapping the X icon on the upper right hand corner of each item." />
        </AccordionQuestion>
        <AccordionQuestion
          title="How do I add/edit my shipping address?"
          content="You may add/edit your shipping address in the checkout screen by tapping the pencil/edit icon in the right-hand corner of the shipping address section."
        >
          <ListItem title="To remove the product entirely from your cart, navigate to the cart screen and each item can be removed by tapping the X icon on the upper right hand corner of each item." />
        </AccordionQuestion>
        <AccordionQuestion
          title="How do I add/edit a credit card to my account?"
          content="You may add/edit a credit card directly in the checkout screen by selecting Credit Card as your payment method and tapping the arrow in-line with it. You will then be navigated to the Credit Card screen where you may tap on the plus icon in the top right corner of the screen."
        >
          <ListItem title="Additionally, you may also add/edit a credit card by navigating to the Settings Page and tapping Manage Cards. From there you can edit a card by tapping the pencil/edit icon on the right-hand corner of each card. You may also remove a card by tapping REMOVE on the bottom of each card. To add a card, tap on the plus icon on the right-hand corner of the screen." />
        </AccordionQuestion>
        <AccordionQuestion
          title="How do I select a credit card?"
          content="First, select Credit Card as your method of payment by tapping it. Then, tap on the arrow next to Credit Card and tap on the card you want to use."
        />
        <AccordionQuestion
          title="How do I rate a product?"
          content="After you have made your order, a popup will appear where you may rate each product that you have purchased. Submit your rating by tapping DONE in the bottom right corner of the popup."
        >
          <ListItem title="If you do not want to rate the product you may tap on the X in the top left corner to close the popup." />
        </AccordionQuestion>
        <AccordionQuestion
          title="How do I view my past orders?"
          content="You can view your most recent purchases from your Profile Page in the Buyer Tab."
        >
          <ListItem title="You can view the more complete and detailed history by tapping See More at the bottom of the Buyer Tab or you can access it directly from the side-drawer by tapping Order History" />
        </AccordionQuestion>
      </AccordionCategory>
      <AccordionCategory categoryTitle="Seller">
        <AccordionQuestion
          title="How do I sell a product?"
          content="Navigate to your profile page and then to the Seller tab where there will be a plus icon in the bottom right of the screen which the user can tap to navigate to a screen where you can fill in the details of their product. Once you are finished filling all the fields, you may tap on the save icon in the top right corner of the screen."
        />
        <AccordionQuestion
          title="Can I edit my product once it has been posted?"
          content="Yes! In fact you can change all of the details of your product (title, images, price, categories, etc.) after it has been posted. To do this, go to the product screen of the product you want to edit and there will be a pencil/edit icon in the bottom right corner of the product images which you may tap to edit your product"
        />
        <AccordionQuestion
          title="How do I get my product to the front page?"
          content="There are two ways your product may appear on the front page - if it is popular, if it is recommended to the user."
        >
          <ListItem title="The more users tap on your product and view it the more popular it is. To boost your product’s popularity, use a clear and appealing image as your product thumbnail, provide a short and simple title, and give it an adequate price (it is recommended to search similar products to see the market price and either match it or price your product slightly lower)." />
          <ListItem title="To have your product recommended to users. Make sure that you select more than one category which your product fits into." />
        </AccordionQuestion>
        <AccordionQuestion
          title="How can I add a discount to my products?"
          content="Unfortunately, there is no way for a seller to set a discount on their own products. Discounts are only set by moderators. You may get in touch with us through the Contact Us Page if you want to recommend your product for a discount."
        />
        <AccordionQuestion
          title="How do I view my earnings/sales? "
          content="In your profile page, in the Seller tab you can see your total earnings, your earnings this month and from the bar graph you can see how much you earn each day of this month."
        />
      </AccordionCategory>
      <AccordionCategory categoryTitle="My Account">
        <AccordionQuestion
          title="How do I edit my profile?"
          content="You can edit your profile picture, username, full name, bio, and change your email through your profile page by tapping on your profile picture."
        >
          <ListItem title="You can also edit your profile through the Settings page by tapping on Edit Profile." />
        </AccordionQuestion>
        <AccordionQuestion
          title="Can I change my email?"
          content="Yes, you may change your email in the edit profile page"
        />
        <AccordionQuestion
          title="Can I change my password?"
          content="Yes, you can change your password through the Settings page. By tapping Change Password"
        />
        <AccordionQuestion
          title="What do the analytics mean?"
          content="The analytics for both buyer and seller tabs compares the data from this month with the data from the previous month and determines the percent increase or the percent decrease."
        />
        <AccordionQuestion
          title="What do the scores under Activity and Feedback or Response Rate mean?"
          content="Activity - points are awarded based on your interaction with the app. For example, placing orders, participating in product discussion, posting and replying on a product page, rating products."
        >
          <ListItem title="Feedback - points are awarded based on how often you participate in product discussion and provide feedback to the product." />
          <ListItem title="Response Rate - points are awarded based on how much users respond/interact with your product. This can include views, comments, purchases, ratings" />
        </AccordionQuestion>
        <AccordionQuestion
          title="How do I change my location?"
          content="Your location is extracted from the set shipping address. You may change this in the Settings Page by tapping on Shipping Address. (Don’t worry only your country and city will be viewable to others, not your specific address)"
        />
      </AccordionCategory>
      <AccordionCategory categoryTitle="Notifications">
        <AccordionQuestion
          title="How can I disable certain notifications? "
          content="You can disable most notifications from the Settings Page in the Notifications section. Tap the switch to toggle certain notification filters."
        />
        <AccordionQuestion
          title="What do the notification filters mean?"
          content="Transactions - notifications that are sent to the buyer of the product to notify them of their recent purchase, and also to the seller of the product."
        >
          <ListItem title="Product Discussion - notifications that are sent to the seller of the product to notify them that somebody has commented on their product, or to a user to notify them that someone has replied to their comment." />
          <ListItem title="Wishlist Changes - notifications to inform the user when they remove items from their wishlist." />
          <ListItem title="Sales - notifications to inform the user when there are sales occurring." />
        </AccordionQuestion>
        <AccordionQuestion
          title="I have disabled all notifications, why am I still getting notifications?"
          content="Certain notifications such as official statements, updates, or direct messages to you cannot be disabled as they are considered integral information to the user."
        />
        <AccordionQuestion
          title="Can I delete notifications?"
          content="Yes, if you press and hold the notification you want to delete, there will be a popup confirming whether you want to remove the notification or not."
        />
      </AccordionCategory>
    </List.AccordionGroup>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: Colors.inactive_grey,
    fontFamily: "helvetica-standard",
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  categoryTitle: {
    fontSize: 16,
    fontFamily: "helvetica-standard",
    color: "black",
  },

  question: {
    fontFamily: "helvetica-bold",
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 20,
  },

  answer: {
    fontSize: 14,
    fontFamily: "helvetica-standard",
    color: Colors.black,
    marginLeft: 20,
    marginTop: -20,
  },
});

export default HelpScreenAccordion;
