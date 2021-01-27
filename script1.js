let button = document.getElementById('btn');
let movie = document.getElementById("movie");
let series = document.getElementById("series");
let episode = document.getElementById("episode");
let result_div = document.getElementById('result_div');
let pagination_div = document.getElementById('pagination');


button.onclick = function () {
  while (result_div.firstChild) {
    result_div.removeChild(result_div.firstChild);
  }
  while (pagination_div.firstChild) {
    pagination_div.removeChild(pagination_div.firstChild);
  }
  pagination_div

  let user_data = document.getElementById("search").value;

  let type = function () {

    if (movie.checked) {
      return "movie";
    }
    else if (series.checked) {
      return "series";
    }
    else if (episode.checked) {
      return "episode";
    }
  };


  let page = 1;
  let url = `http://www.omdbapi.com/?s=${user_data}&type=${type()}&page=${page}&apikey=9af90fb8`;


  fetch(url)
    .then(response => {
      return response.json();

    })
    .then(newObject => {
      if (newObject.hasOwnProperty('Error')) {
        let single_div = document.createElement('div');
        single_div.className = 'single_div';
        single_div.innerHTML = newObject.Error;
        result_div.append(single_div);
      }
      for (key in newObject.Search) {
        let single_div = document.createElement('div');
        single_div.className = 'single_div';
        single_div.innerHTML = `<div class="back"><h2>${newObject.Search[key].Title}</h2><h2>${newObject.Search[key].Year}</h2></div><img src='${newObject.Search[key].Poster}' alt='poster'></img>`;
        if (single_div.lastElementChild.getAttribute('src') === 'N/A') {
          single_div.lastElementChild.setAttribute('src', './images/no_poster.jfif');
        }
        result_div.append(single_div);
        single_div.onclick = (e) => {
          let x = e.target.closest('div');
          x.classList.toggle('zzz');

        }
      }
      // pagination
      let all_pages = Math.ceil(newObject.totalResults / 10);

      for (i = 1; i <= all_pages; i++) {
        let pag_block = document.createElement('button');
        pag_block.className = 'pag';
        pag_block.setAttribute('value', `${i}`);
        pag_block.innerHTML = `${i}`;
        pagination_div.append(pag_block);

        pag_block.onclick = function (e) {
          let pag_page = e.target.value;
          let pag_url = `http://www.omdbapi.com/?s=${user_data}&type=${type()}&page=${pag_page}&apikey=9af90fb8`;
          while (result_div.firstChild) {
            result_div.removeChild(result_div.firstChild);
          }
          fetch(pag_url)
            .then(response => {
              return response.json();
            })
            .then(newObject => {
              for (key in newObject.Search) {
                let single_div = document.createElement('div');
                single_div.className = 'single_div';
                single_div.innerHTML = `<div class="back"><h1>${newObject.Search[key].Title}</h1><h2>${newObject.Search[key].Year}</h2></div><img src='${newObject.Search[key].Poster}' alt='poster'></img>`;
                if (single_div.lastElementChild.getAttribute('src') === 'N/A') {
                  single_div.lastElementChild.setAttribute('src', './images/no_poster.jfif')
                }
                result_div.append(single_div);

                single_div.onclick = (e) => {
                  let x = e.target.closest('div');
                  x.classList.toggle('zzz');

                }
              }
            })

        }
      }
    })
    .catch(error => {
      console.warn(error);
    });


};




// single_div.onclick = () => {
//   let newDiv = document.createElement("div");
//   newDiv.innerHTML = `<h1>${newObject.Search.Title}</h1><p>${newObject.Search.Year}</p>`;
//   single_div.before(newDiv);
// }
// let x = { "Search": [{ "Title": "Harry Potter and the Deathly Hallows: Part 2", "Year": "2011", "imdbID": "tt1201607", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg" }, { "Title": "Harry Potter and the Sorcerer's Stone", "Year": "2001", "imdbID": "tt0241527", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg" }, { "Title": "Harry Potter and the Chamber of Secrets", "Year": "2002", "imdbID": "tt0295297", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg" }, { "Title": "Harry Potter and the Prisoner of Azkaban", "Year": "2004", "imdbID": "tt0304141", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg" }, { "Title": "Harry Potter and the Goblet of Fire", "Year": "2005", "imdbID": "tt0330373", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg" }, { "Title": "Harry Potter and the Order of the Phoenix", "Year": "2007", "imdbID": "tt0373889", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_SX300.jpg" }, { "Title": "Harry Potter and the Deathly Hallows: Part 1", "Year": "2010", "imdbID": "tt0926084", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg" }, { "Title": "Harry Potter and the Half-Blood Prince", "Year": "2009", "imdbID": "tt0417741", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg" }, { "Title": "When Harry Met Sally...", "Year": "1989", "imdbID": "tt0098635", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjE0ODEwNjM2NF5BMl5BanBnXkFtZTcwMjU2Mzg3NA@@._V1_SX300.jpg" }, { "Title": "Dirty Harry", "Year": "1971", "imdbID": "tt0066999", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMzdhMTM2YTItOWU2YS00MTM0LTgyNDYtMDM1OWM3NzkzNTM2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg" }], "totalResults": "607", "Response": "True" }


