var titleArray = JSON.parse(localStorage.getItem("titles")) || [];
var authorArray = JSON.parse(localStorage.getItem("authors")) || [];
var infoArray = JSON.parse(localStorage.getItem("urls")) || [];
var imageIdArray = JSON.parse(localStorage.getItem("images")) || [];

function displayFavorites() {

  var html = "";

  for (let i = 0; i < titleArray.length; i++) {
    html += createHtmlForBook(imageIdArray[i], titleArray[i], infoArray[i], authorArray[i], i);
  }

  if (html.length < 1) {
    $("#noFavorites").html("No favorites selected yet.  Search books and add favorites to build this list.");
  } else {
    $("#favorites").html(html);
  }

  for (let i = 0; i < titleArray.length; i++) {
      $("#favButton-" + i).on('click', removeFavorite);
  }

}


function createHtmlForBook(coverId, title, url, author, index) {

  var imgurl;
  if (coverId !== 'undefined') {
      imgurl = "https://covers.openlibrary.org/b/ID/" + coverId + "-S.jpg";
  } else {
      imgurl = "./assets/images/noImageAvailableSmall.jpg";
  }

  var html = "";
  html += "<table class='bookTable'>";
  html += "    <tr><td rowspan='0' class='smallImgTd'><img src='" + imgurl + "'></img></td>";
  html += "    <td class='favoriteTd'><label>Title: </label>" + title + "</td>";
  html += "    <td class='favoriteTd'><label>More Information: </label><a href ='" + url + "'>" + title + "</a></td></tr>";
  html += "    <tr><td class='favoriteTd'><label>Author: </label>" + author + "</td>";
  html += "    <td class='favoriteTd'><input type='button' id='favButton-" + index + "' value='Remove From Favorites'></input></td></tr>"
  html += "</table><br>";
  return html;
}

function removeFavorite() {
    var index = this.id.split("-")[1];

    titleArray.splice(index, 1);
    authorArray.splice(index, 1);
    infoArray.splice(index, 1);
    imageIdArray.splice(index, 1);

    localStorage.setItem("titles", JSON.stringify(titleArray));
    localStorage.setItem("authors", JSON.stringify(authorArray));
    localStorage.setItem("urls", JSON.stringify(infoArray));
    localStorage.setItem("images", JSON.stringify(imageIdArray));

    window.location.reload();
}
  
displayFavorites();