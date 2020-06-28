class user {
  constructor(uid, email, username, profilePicture, verified, hashedPassword) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.profilePicture = profilePicture;
    this.verified = verified;
    this.hashedPassword = hashedPassword;
  }
}

export default user;
