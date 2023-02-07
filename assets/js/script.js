var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var authorInputVal = document.querySelector('#author-input').value;
  var subjectInputVal = document.querySelector('#subject-input').value;
 
  console.log(authorInputVal);
  if (!authorInputVal & !subjectInputVal) {
    console.error('You need to give us an author or a subject!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


//https://openlibrary.org/search/authors.json