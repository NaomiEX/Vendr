class user {
  constructor(
    uid,
    email,
    username,
    profilePicture,
    verified,
    hashedPassword,
    fullName,
    bio
  ) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.profilePicture = profilePicture;
    this.verified = verified;
    this.hashedPassword = hashedPassword;
    this.fullName = fullName;
    this.bio = bio;
  }
}

export default user;
