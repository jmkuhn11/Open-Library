var form = document.getElementById("search-form");
var bookPage = document.getElementById('bookPage');
var next = document.getElementById('next');
var previous = document.getElementById('previous');
var pageStartIndex = 0;

next.addEventListener('click', nextPage);
previous.addEventListener('click', previousPage);

var author;
var subject;

function getFromUrl() {
    var searchUrl = document.location.search.split('&');
    console.log(searchUrl);
    author = searchUrl[0].split('=').pop();
    subject = searchUrl[1].split('=').pop();

    console.log(author);
    console.log(subject);
  
    displayBooks(author, subject, pageStartIndex);
  }
  
function displayBooks(author, subject, startIndex) {
    console.log(startIndex);
    var finalUrl = 'https://openlibrary.org/search.json?';
  
    var endUrl;
  if (author && subject) {
    endUrl = 'author=' + author + '&subject=' + subject;
  } else if (!subject) {
    endUrl = 'author=' + author;
  } else if (!author) {
    endUrl = 'subject=' + subject;
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
      .then(function (searchResults) {
        console.log(searchResults);
        var firstBook = startIndex + 1;
        var lastBook = startIndex + 10;
        if (lastBook > searchResults.numFound) {
            lastBook = searchResults.numFound;
        }

        document.getElementById("searchCount").textContent = "Search results found: " + searchResults.numFound + "  (Showing " + firstBook + " to " + lastBook + ")";

        var html = create10Books(searchResults, startIndex);
        console.log(html);
        bookPage.innerHTML = html;

        if (startIndex == 0) {
            previous.disabled = true;
        } else {
            previous.disabled = false;
        }

        if (startIndex + 10 > searchResults.docs.length) {
            next.disabled = true;
        } else {
            next.disabled = false;
        }
  
        //console.log(localPage);
  
        if (!localPage.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function nextPage() {
    pageStartIndex = pageStartIndex + 10;
    displayBooks(author, subject, pageStartIndex);
  }

  function previousPage() {
    pageStartIndex = pageStartIndex - 10;
    displayBooks(author, subject, pageStartIndex);
  }

  function create10Books(searchResults, start) {
    var html = "<table class='booksTable'>";
    console.log(start);
    for (let i = start; i < start + 10; i++) {

        if (i < searchResults.docs.length) {
            html += "<tr><td>";
            html += createHtmlForBook(searchResults.docs[i]);
            html += "</td></tr>";
        }
    }
    html += "</table>";

    return html;
  }


  function createHtmlForBook(doc) {
    var imgurl = "https://covers.openlibrary.org/b/ID/" + doc.cover_i + "-M.jpg";

    var html = "";
    html += "<table class='bookTable'>";
    html += "    <tr><td rowspan='0' class='imgTd'><img src='" + imgurl + "'></img></td>";
    html += "    <td><label>Title: </label>" + doc.title + "</td>";
    html += "    <td class='buttonTd'><input type='button' value='More Information' />&nbsp;&nbsp;";
    html += "    <input type='button' value='Add to Favorites' /></td>";
    html += "    </td></tr>";
    html += "    <tr><td><label>Author: </label>" + doc.author_name + "</td></tr>";
    html += "    <tr><td><label>Year Released: </label>" + doc.first_publish_year + "</td></tr>";

    var subjects

    if (doc.subject) {
        var subjectArray = doc.subject;
        subjects = subjectArray.join(", ");
    } else {
        subjects = "No subjects listed.";
    }

    //var subjectArray = doc.subject;
    //var subjects = subjectArray.join(", ");
    //for (let i = 0; i < subjectArray.length; i++) {
    //     subjects += subjectArray[i];
    //     if (i + 1 != subjectArray.length) {
    //         subjects += ", ";
    //     }
    // }

    html += "    <tr><td colspan='2'>";
    html += "<table><tr><td><label>Subjects: </label></td><td>" + subjects + "</td></tr></table>";
     
    html += "</td></tr>";
    html += "</table>";

    return html;
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