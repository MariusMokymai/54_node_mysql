const bcrypt = require('bcryptjs');

const plainPass = '123456';

// uzkodavimas
// const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(plainPass, 10);

// console.log('salt ===', salt);

console.log('passwordHash ===', passwordHash);

// patikrinti slaptazodi

const arSutampa = bcrypt.compareSync('123456', passwordHash);
console.log('arSutampa ===', arSutampa);

const len = '$2a$10$QQyHHu1BJ4Rrg09PYKJP2OYGE2u5pvRR7Yas71Lhd/sJe/XSwvQ3S'
  .length;
console.log('len ===', len);
