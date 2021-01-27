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
  let url = `https://www.omdbapi.com/?s=${user_data}&type=${type()}&page=${page}&apikey=9af90fb8`;


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
        single_div.innerHTML = `<div class="back"><h1>${newObject.Search[key].Title}</h1><h2>${newObject.Search[key].Year}</h2></div><img src='${newObject.Search[key].Poster}' alt='poster'></img>`;
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
          let pag_url = `https://www.omdbapi.com/?s=${user_data}&type=${type()}&page=${pag_page}&apikey=9af90fb8`;
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
