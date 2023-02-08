var form = document.getElementById("search-form");
var bookPage = document.getElementById('bookPage');

function getFromUrl() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchUrl = document.location.search.split('&');
    console.log(searchUrl);
    // Get the query and format values
    var author = searchUrl[0].split('=').pop();
    var subject = searchUrl[1].split('=').pop();

    console.log(author);
    console.log(subject);
  
    displayBooks(author, subject);
  }
  
function displayBooks(author, subject) {
    var finalUrl = 'https://openlibrary.org/search.json?';
  
  if (author && subject) {
    var endUrl = 'author=' + author + '&subject=' + subject;
  } else if (!subject) {
    var endUrl = 'author=' + author;
  } else if (!author) {
    var endUrl = 'subject=' + subject;
  } else {
    console.error('Please return to the main page and provide an author and/or a subject!');
    return;
  }
  
    finalUrl = finalUrl + endUrl;
  
    fetch(finalUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (localPage) {
        // write query to page so user knows what they are viewing
        bookPage.textContent = localPage.search;
  
        console.log(localPage);
  
        if (!localPage.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          //for (var i = 0; i < locRes.results.length; i++) {
            //printResults(locRes.results[i]);
          //}
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  /*console.log(authorInputVal & subjectInputVal);
  if (!authorInputVal & !subjectInputVal) {
    console.error('You need to give us an author or a subject!');
    return;
  }

  var QueryString = 'https://openlibrary.org/search.json?author=' + authorInputVal + '&subject=' + subjectInputVal;

  location.assign(QueryString);


  console.log(authorInputVal & subjectInputVal);
  if (authorInputVal & subjectInputVal) {
    var QueryString = 'https://openlibrary.org/search.json?author=' + authorInputVal + '&subject=' + subjectInputVal;
  } else if (!subjectInputVal) {
    var QueryString = 'https://openlibrary.org/search.json?author=' + authorInputVal;
  } else if (!authorInputVal) {
    var QueryString = 'https://openlibrary.org/search.json?subject=' + subjectInputVal;
  } else {
    console.error('You need to give us an author or a subject!');
    return;
  }*/

  getFromUrl()