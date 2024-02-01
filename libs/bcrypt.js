const bcrypt = require("bcrypt");

const originalPassword = "Musicadminshop2023";
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function (err, salt) {
  if (err) {
    console.error("Error generating salt");
    return;
  }

  bcrypt.hash(originalPassword, salt, function (err, hash) {
    if (err) {
      console.error("Error hashing password");
      return;
    }
    console.log(hash);
  });
});
