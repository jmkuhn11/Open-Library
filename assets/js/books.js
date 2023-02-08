  /*console.log(authorInputVal & subjectInputVal);
  if (!authorInputVal & !subjectInputVal) {
    console.error('You need to give us an author or a subject!');
    return;
  }

  var QueryString = 'https://openlibrary.org/search.json?author=' + authorInputVal + '&subject=' + subjectInputVal;

  location.assign(QueryString);*/


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
  }