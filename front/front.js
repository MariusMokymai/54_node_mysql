'use strict';
console.log('front.js file was loaded');

const catUrl = 'http://localhost:3000/api/categories';
const postsUrl = 'http://localhost:3000/api/posts';

// parsisiusti kategorijas ir iskonsolinti

const selectEl = document.getElementById('category');
const newPostForm = document.forms[0];

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

newPostForm.addEventListener('submit', handleNewPost);

function handleNewPost(event) {
  event.preventDefault();
  console.log('forma pateikta');

  const { title, author, date, content, category } = newPostForm.elements;

  // surinkti inputus i objekta
  const newPostObj = {
    title: title.value,
    author: author.value,
    date: date.value,
    content: content.value,
    cat_id: +category.value,
  };
  console.log('newPostObj ===', newPostObj);

  // siusti i back end
  fetch(postsUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newPostObj),
  })
    .then((resp) => {
      if (resp.status === 201) {
        console.log('pavyko sukurti');
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
