var searchFormEl = $('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var authorInputVal = $('#author-input').val();
  var subjectInputVal = $('#subject-input').val();
 
  var searchPage = './search.html?author=' + authorInputVal + '&subject=' + subjectInputVal;

  location.assign(searchPage);
}

searchFormEl.on('submit', handleSearchFormSubmit);