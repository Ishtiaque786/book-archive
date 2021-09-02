// handled the id's in the variable
const resultFound = document.getElementById("resultFound");
const error = document.getElementById("error");

// onclick searchbook function
const searchBook = () => {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value;
  console.log(searchText);
  searchInput.value = "";
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResult(data.docs);

      //checking what to show in text
      if (data.numFound === 0) {
        error.innerText = "nothing to show";
      } else {
        error.innerText = "";
      }
    });
};

// display search result function
const displaySearchResult = (docs) => {
  const resultFound = document.getElementById("resultFound");
  resultFound.innerText = `Total number of result found ${docs.length}`;

  const searchResult = document.getElementById("searchResult");
  searchResult.textContent = "";

  docs?.forEach((info) => {
    error.innerText = "";
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${info.cover_i}.jpg"
                <div class="card-body">
                     <h5 class="card-title">Name:${info.title}</h5>
          
                     <h5 class="card-text"> Author's Name:${info.author_name[0]}</h5>
                    
                     <h5 class="card-text"> Publisher:${info.publisher[0]}</h5>
          
                     <h5 class="card-text"> First published in:${info.first_publish_year}</h5>      
                </div>
            </div>`;
    searchResult.appendChild(div);
  });
};
