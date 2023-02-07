var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var authorInputVal = document.querySelector('#author-input').value;
  var subjectInputVal = document.querySelector('#subject-input').value;
 
  console.log(authorInputVal & subjectInputVal);
  if (!authorInputVal & !subjectInputVal) {
    console.error('You need to give us an author or a subject!');
    return;
  }

  var QueryString = 'https://openlibrary.org/search.json?author=' + authorInputVal + '&subject=' + subjectInputVal;

  location.assign(QueryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//https://openlibrary.org/search/authors.json?q=suzanne-collins
//https://openlibrary.org/authors/OL1394359A/works.json
//https://openlibrary.org/subjects/love.json