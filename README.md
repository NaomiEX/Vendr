<a>
  <image src="https://firebasestorage.googleapis.com/v0/b/vendr-6265c.appspot.com/o/images%2Flogo_word.png?alt=media&token=2681769f-282b-4834-b1ad-b8c555a1af55" title="Vendr" align="right" height="50" alt="Vendr logo"/>
</a>

Vendr
=====
>A mock e-commerce app where users can buy and sell products.

>This app was created by Michelle Adeline as a Computer Science Project completed over the course of 2 months.

## Table of contents
* [Demo](#demonstration)
* [General info](#general-info)
* [Features](#features)
* [Built with](#built-with)

## Demonstration

### Login Screen / Sign Up Screen

![Login](./assets/login_small.png)    ![Sign Up](./assets/sign_up_smaller.png)

### Discount Screen

![Sale](./assets/discount_smaller.png)

### Splash Screen

![Splash](./assets/splash_smaller.png)

### Wishlist

![Wishlist](./assets/wishlist_smaller.png)

### Cart

![Cart](./assets/cart_smaller.png)

### Drawer

![Drawer](./assets/drawer_smaller.png)

### Checkout

![Checkout](./assets/checkout-screen.gif)

## Key Features

* **Personalized recommended** products based on previous user activity
* **Authentication** using **Firebase** (login, sign up, sign out, etc.)
* Real-time **user notifications**
* **Posting** and **replying** to comments under product discussion
* **User analytics** (comparing purchases, app activity, products sold, earnings, and customer engagement with the previous month)
* **Device camera** and **gallery** utilization for product posting
* **Search suggestions** as user types in the **search bar**
* **Rating** and **providing feedback** on purchased products
* **Personalization** of **user profiles**

## Page Breakdown

### Login/Sign Up Screen

Unless the user is already signed in, the first screen the user will see when they boot up the app (aside from the splash screen) is the Login Screen. On this screen the user can type in their email-address and password which are validated in real-time with the help of [validate.js](https://validatejs.org/).

The rules for a valid email address are:
1. The field cannot be empty

The rules for a vaild password are:
1. The field cannot be empty

Provided that both fields are valid, they are sent to Firebase which is the database where all users' information are stored and it checks a couple of things:
1. Whether that email address exists
2. Whether the password matches the one linked with the email address in the database

If one or more of the above conditions are false, an alert is displayed and the login process is halted. Otherwise the app proceeds to the [Home Screen](#home-screen).

If the user does not already have an account in Vendr, they can navigate to the Sign Up screen where they can type in an email-address, username, and password which are also validated with the help of [validate.js](https://validatejs.org/).

The rules for a valid username are:
1. 

Provided that all three fields are valid, they are sent to Firebase where it checks whether the email has already been taken, if so an alert is displayed and the sign up process is halted. Otherwise the app proceeds to the [Home Screen](#home-screen).

### Home Screen


### Profile Page


### Category Screen


### Products Screen


### Create/Edit Product Screen


### Product Details Screen


### Wishlist


### Cart & Checkout


### Order History


### Notifications Screen


## Built with
* Node.js version 12.16.3
* Expo SDK v37.0.0
* React Native 0.62
* React Navigation 5.x
* React Redux version 7.2
* Firebase
* Android Studio (Emulator)
* Figma (Design & Prototyping)

