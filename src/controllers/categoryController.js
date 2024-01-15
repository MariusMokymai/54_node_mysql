const { getSqlData } = require('../helper');

const getAll = async (req, res) => {
  const sql = 'SELECT * FROM `categories`';

  const [categoriesArr, error] = await getSqlData(sql);

  if (error) {
    // euston we have a proplem
    console.log('error ===', error);
    res.status(500).json('something wrong');
    return;
  }

  res.json(categoriesArr);
};

module.exports = {
  getAll,
};
