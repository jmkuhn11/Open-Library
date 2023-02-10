var searchFormEl = $('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var authorInputVal = $('#author-input').val();
  var subjectInputVal = $('#subject-input').val();
 
  var searchPage = './search.html?author=' + authorInputVal + '&subject=' + subjectInputVal;

  location.assign(searchPage);
}

searchFormEl.on('submit', handleSearchFormSubmit);

//https://openlibrary.org/search/authors.json?q=suzanne-collins
//https://openlibrary.org/authors/OL1394359A/works.json
//https://openlibrary.org/subjects/love.json