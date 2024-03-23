const apiKey = "4DbBZiMrdjiqSbmP7Zwcio6h3xwMh2Al7dsElkpk";
let searches = [];

//  to get current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    document.getElementById('head').innerHTML = `NASA Picture of the Day`
    fetchImageOfTheDay(currentDate);
}

//  to get image of day which we select
function getImageOfTheDay() {
     const searchInput = document.getElementById('search-input').value;
     if(searchInput == ""){
        alert('Fill The Input');
     }
    else{
     document.getElementById('head').innerHTML = `Picture on ${searchInput}`
         fetchImageOfTheDay(searchInput);
         saveSearch(searchInput);

         let timer = setTimeout(()=>{
            document.getElementById('search-input').value = "";
          }, 1000)
         timer();
     }
} 

// this function useful to show elements in HTML page
function fetchImageOfTheDay(date){
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
      const imageContainer = document.getElementById("current-image");
      imageContainer.innerHTML = `
        <img class="image" src="${data.hdurl}">
        <h3 class="title">${data.title}</h3>
        <p  class="para">${data.explanation}</p>
      `;
    })
    .catch(error => console.log(error));
}

// this function is useful to save seach history in localStorage
function saveSearch(date) {
     const searches = JSON.parse(localStorage.getItem('searches')) || [];

     searches.push({date: `${date}`});
     localStorage.setItem('searches', JSON.stringify(searches));
     addSearchToHistory();
}

// this function is useful to retrieve data from localStorage and present the data in list format and when we click on list items page will render the image of the day...
function addSearchToHistory() {
  const searchHistory = document.getElementById("search-history");
  const dateItem = JSON.parse(localStorage.getItem("searches"))
  for(let i=0; i<dateItem.length; i++){
    var li = document.createElement("li");
    li.textContent = dateItem[i].date;
    li.addEventListener('click', function() {
        document.getElementById('head').innerHTML = `Picture on ${dateItem[i].date}`
        fetchImageOfTheDay(dateItem[i].date);
      })
  }
   searchHistory.prepend(li);
}