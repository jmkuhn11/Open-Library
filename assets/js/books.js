var form = $("#search-form");
var bookPage = $("#bookPage");
var next = $("#next");
var previous = $("#previous");
var pageStartIndex = 0;
var moreInfo = [];

var titleArray = JSON.parse(localStorage.getItem("titles")) || [];
var authorArray = JSON.parse(localStorage.getItem("authors")) || [];
var infoArray = JSON.parse(localStorage.getItem("urls")) || [];
var imageIdArray = JSON.parse(localStorage.getItem("images")) || [];

next.on('click', nextPage);
previous.on('click', previousPage);

var author;
var subject;

function getFromUrl() {
    var searchUrl = document.location.search.split('&');
    
    author = searchUrl[0].split('=').pop();
    subject = searchUrl[1].split('=').pop();
  
    displayBooks(author, subject, pageStartIndex);
  }
  
function displayBooks(author, subject, startIndex) {
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
        var firstBook = startIndex + 1;
        var lastBook = startIndex + 10;
        if (lastBook > searchResults.numFound) {
            lastBook = searchResults.numFound;
        }

        document.getElementById("searchCount").textContent = "Search results found: " + searchResults.numFound + "  (Showing " + firstBook + " to " + lastBook + ")";

        var html = create10Books(searchResults, startIndex);

        if (startIndex == 0) {
            previous.prop('disabled', true);
        } else {
            previous.prop('disabled', false);
        }

        if (startIndex + 10 > searchResults.docs.length) {
            next.prop('disabled', true);
        } else {
            next.prop('disabled', false);
        }
  
        
        if (!searchResults.docs.length) {
          bookPage.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
            bookPage.html(html);
        }

        for (let i = startIndex; i < startIndex + 10; i++) {
            $("#saveFavorite-" + i).on('click', saveFavorite);
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
    for (let i = start; i < start + 10; i++) {

        if (i < searchResults.docs.length) {
            html += "<tr><td>";
            html += createHtmlForBook(searchResults.docs[i], i);
            html += "</td></tr>";
        }
    }
    html += "</table>";

    return html;
  }


  function createHtmlForBook(doc, count) {

    var imgurl;
    if (doc.cover_i) {
        imgurl = "https://covers.openlibrary.org/b/ID/" + doc.cover_i + "-M.jpg";
    } else {
        imgurl = "./assets/images/noImageAvailable.jpg";
    }

    var html = "";
    html += "<table class='bookTable'>";
    html += "    <tr><td rowspan='0' class='imgTd'><img class='bookCover' src='" + imgurl + "'></img>";
    html += "    <input type='hidden' id='imageId" + count + "' value='" + doc.cover_i + "' /></td>";
    html += "    <td><label>Title: </label><span id='spanTitle" + count + "'>" + doc.title + "</span></td>";

    moreInfo[count] = "https://openlibrary.org" + doc.key;

    html += "    <td class='buttonTd'><input class='moreInfoClass' type='button' value='More Information' onclick='goToMoreInfo(" + count + ")' />&nbsp;&nbsp;";
    html += "    <input type='button' class='saveFavoriteClass' id='saveFavorite-" + count + "' value='Add to Favorites' /></td>";
    html += "    </td></tr>";
    html += "    <tr><td><label>Author: </label><span id='spanAuthor" + count + "'>" + doc.author_name + "</span></td></tr>";
    html += "    <tr><td><label>Year Released: </label>" + doc.first_publish_year + "</td></tr>";``

    var subjects

    if (doc.subject) {
        var subjectArray = doc.subject;
        subjects = subjectArray.join(", ");
    } else {
        subjects = "No subjects listed.";
    }

    html += "    <tr><td colspan='2'>";
    html += "<table><tr><td><label>Subjects: </label></td><td>" + subjects + "</td></tr></table>";
     
    html += "</td></tr>";
    html += "</table>";

    return html;
  }

  function goToMoreInfo(count) {
        window.open(moreInfo[count], '_blank');
  }
  
  function saveFavorite() {
        var index = this.id.split("-")[1];

        var title = $("#spanTitle"+ index).text();
        var author = $("#spanAuthor"+ index).text();
        var imageId = $("#imageId"+ index).val();

        var moreInfoUrl = moreInfo[index];

        titleArray.push(title);
        authorArray.push(author);
        infoArray.push(moreInfoUrl);
        imageIdArray.push(imageId);

        localStorage.setItem("titles", JSON.stringify(titleArray));
        localStorage.setItem("authors", JSON.stringify(authorArray));
        localStorage.setItem("urls", JSON.stringify(infoArray));
        localStorage.setItem("images", JSON.stringify(imageIdArray));
        $("#saveFavorite-" + index).prop('disabled', true);
  }

  getFromUrl()