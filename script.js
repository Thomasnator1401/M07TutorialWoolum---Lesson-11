const bcrypt = require("bcrypt"); // import bcrypt library
function validateUser(user, email, password) {
  // create a regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // check if the email matches the regex
  if (!emailRegex.test(email)) {
    return false; // invalid email
  }
  // check if the password matches the user's hashed password using bcrypt
  return bcrypt.compareSync(password, user.password); // returns true or false
}
