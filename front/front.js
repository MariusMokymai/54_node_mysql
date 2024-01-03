'use strict';
console.log('front.js file was loaded');

const catUrl = 'http://localhost:3000/api/categories';
const postsUrl = 'http://localhost:3000/api/posts';

// parsisiusti kategorijas ir iskonsolinti

const selectEl = document.getElementById('category');
const newPostForm = document.forms[0];
const postList = document.getElementById('posts-list');
console.log('postList ===', postList);
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

  const postsArr = await getPosts(postsUrl);
  console.log('postsArr ===', postsArr);

  const elArr = postsArr.map(makeOneLi);
  console.log(elArr[0]);
  console.log('elArr ===', elArr);
  postList.append(...elArr);
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

function getPosts(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

function makeOneLi({
  post_id: id,
  title,
  author,
  date,
  categoryName,
  content,
}) {
  // sukurti viena html el is objekto
  const liEl = document.createElement('li');
  liEl.className = 'post column column-50';
  liEl.dataset.postId = id;
  const formatedDate = new Date(date).toLocaleString('lt-LT', {
    dateStyle: 'long',
  });
  liEl.innerHTML = `
  <h3>${title}</h3>
  <p><i>${author}</i></p>
  <p>${formatedDate}</p>
  <p>${content}</p>
  <p>${categoryName}</p>
  `;
  return liEl;
}

const singlePostObj = {
  post_id: 1,
  title: 'Post 1',
  author: 'James Band',
  content: 'Body of post 1',
  date: '2023-12-26T22:00:00.000Z',
  categoryName: 'Comedy',
};

/*
<li data-post-id="1" class="post column column-50">
  <h3>title</h3>
  <p><i>author</i></p>
  <p>date</p>
  <p>content</p>
  <p>categoryName</p>
</li>
*/
