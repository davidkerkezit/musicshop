const bcrypt = require("bcrypt");

const originalPassword: string = "Musicadminshop2023";
const saltRounds: number = 10;

bcrypt.genSalt(
  saltRounds,
  function (err: Error | null, salt: string | undefined) {
    if (err) {
      console.error("Error generating salt");
      return;
    }

    if (!salt) {
      console.error("Salt is undefined");
      return;
    }

    bcrypt.hash(
      originalPassword,
      salt,
      function (err: Error | null, hash: string | undefined) {
        if (err) {
          console.error("Error hashing password");
          return;
        }

        if (!hash) {
          console.error("Hash is undefined");
          return;
        }

        // Use the hash here
      }
    );
  }
);
