import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';

const saltRounds = 10;

export async function encryptPassword(password) {
  return bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));
}

export function generateUniqueToken() {
  const secret = speakeasy.generateSecret({ length: 20 });

  // Generate a TOTP code using the secret key
  const code = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });

  return code;
}
