var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var authorInputVal = document.querySelector('#author-input').value;
  var subjectInputVal = document.querySelector('#subject-input').value;
 
  var searchPage = './search.html?q=' + authorInputVal + '&format=' + subjectInputVal;

  location.assign(searchPage);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//https://openlibrary.org/search/authors.json?q=suzanne-collins
//https://openlibrary.org/authors/OL1394359A/works.json
//https://openlibrary.org/subjects/love.json