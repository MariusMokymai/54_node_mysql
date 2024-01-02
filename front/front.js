'use strict';
console.log('front.js file was loaded');

const catUrl = 'http://localhost:3000/api/categories';

// parsisiusti kategorijas ir iskonsolinti

const selectEl = document.getElementById('category');
console.log('selectEl ===', selectEl);
function getCategories() {
  // parsiusti, iskonsolinti ir grazinti categorijas
  return fetch(catUrl)
    .then((resp) => resp.json())
    .then((catsArr) => catsArr)
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

function makeSelectOpt(arr) {
  // sukti cikla
  // <option value="1">Tragedija</option>
  const optArr = arr.map((catObj) => {
    const optionEl = document.createElement('option');
    optionEl.value = catObj.cat_id;
    optionEl.textContent = catObj.title;
    return optionEl;
  });
  console.log('optArr ===', optArr);
  // pagaminti html
  // sudeti i select
  selectEl.append(...optArr);
}

(async () => {
  // programos kodas
  const gotCategoriesArr = await getCategories();
  console.log('gotCategoriesArr ===', gotCategoriesArr);

  makeSelectOpt(gotCategoriesArr);
})();

// sugeneruoti opcijas selectui
