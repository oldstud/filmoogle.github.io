let button = document.getElementById('btn');
let movie = document.getElementById("movie");
let series = document.getElementById("series");
let episode = document.getElementById("episode");
let result_div = document.getElementById('result_div');
let pagination_div = document.getElementById('pagination');
let modal_description = document.getElementById('modal_description');

let description_div = document.getElementById('description_div');



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
        single_div.innerHTML = `<div class="back" id='${newObject.Search[key].imdbID}'><h1>${newObject.Search[key].Title}</h1><h2>${newObject.Search[key].Year}</h2><button class="modal_btn">more...</button></div><img src='${newObject.Search[key].Poster}' alt='poster'></img>`;
        if (single_div.lastElementChild.getAttribute('src') === 'N/A') {
          single_div.lastElementChild.setAttribute('src', './images/no_poster.jfif');
        }
        result_div.append(single_div);
        // descriptoin modal
        single_div.onclick = (e) => {

          if (e.target.className == "modal_btn") {
            modal_description.style.display = 'block';
            modal_description.onclick = () => {
              modal_description.style.display = 'none';
            }
            while (description_div.firstChild) {
              description_div.removeChild(description_div.firstChild);
            }
            const { id } = e.target.closest('div');
            let description_url = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=9af90fb8`;
            fetch(description_url)
              .then(response => {
                return response.json()
              })
              .then(description_info => {
                const { Title, Actors, Awards, BoxOffice, Country, Director, Genre, Plot, imdbRating, Website } = description_info;
                let content_div = document.createElement('div');
                content_div.className = "draw_info";
                content_div.innerHTML = `<h2>${Title}</h2><p>Actors: ${Actors}</p><p>Awards: ${Awards}</p><p>${BoxOffice}</p><p>${Country}</p><p>Director:${Director}</p><p>${Genre}</p><p>${Plot}</p><p>ImdbRating:${imdbRating}</p>`;
                description_div.append(content_div)
                console.log(description_info);
              })

          }


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
                single_div.innerHTML = `<div class="back" id='${newObject.Search[key].imdbID}'><h1>${newObject.Search[key].Title}</h1><h2>${newObject.Search[key].Year}</h2><button class="modal_btn">more...</button></div><img src='${newObject.Search[key].Poster}' alt='poster'></img>`;
                if (single_div.lastElementChild.getAttribute('src') === 'N/A') {
                  single_div.lastElementChild.setAttribute('src', './images/no_poster.jfif')
                }
                result_div.append(single_div);

                ///click on poster(after paginationClick)

                single_div.onclick = (e) => {

                  if (e.target.className == "modal_btn") {
                    modal_description.style.display = 'block';
                    modal_description.onclick = () => {
                      modal_description.style.display = 'none';
                    }
                    while (description_div.firstChild) {
                      description_div.removeChild(description_div.firstChild);
                    }
                    const { id } = e.target.closest('div');
                    let description_url = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=9af90fb8`;
                    fetch(description_url)
                      .then(response => {
                        return response.json()
                      })
                      .then(description_info => {
                        const { Title, Actors, Awards, BoxOffice, Country, Director, Genre, Plot, imdbRating, Website } = description_info;
                        let content_div = document.createElement('div');
                        content_div.className = "draw_info";
                        content_div.innerHTML = `<h2>${Title}</h2><p>Actors: ${Actors}</p><p>Awards: ${Awards}</p><p>${BoxOffice}</p><p>${Country}</p><p>Director:${Director}</p><p>${Genre}</p><p>${Plot}</p><p>ImdbRating:${imdbRating}</p>`;
                        description_div.append(content_div)
                        console.log(description_info);
                      })

                  }


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
