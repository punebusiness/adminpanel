import bcrypt from 'bcrypt';
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(hash);
      }
    });
  });
};

const comparePassword = (user, stored) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(user, stored, (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};

export { hashPassword, comparePassword };
