const API_URI = "https://jsonplaceholder.typicode.com/posts";
const POSTS_PER_LOAD = 10;
let POST_DATA = [];
let currentPostIndex = 0;

function init() {
  loadPostList();
  document.getElementById("loadMoreButton").addEventListener("click", loadNextPosts);
  //turn this off if you don't want an endless scroll, the "load more" button will appear
  //window.addEventListener("scroll", handleScroll);
}

function loadPostList() {
  fetch(API_URI)
    .then((response) => response.json())
    .then(function (data){      
      POST_DATA = data;
      displayPostList();
    });
}

function displayPostList() {
  const currentVisiblePosts = POST_DATA.slice(
    currentPostIndex, 
    currentPostIndex + POSTS_PER_LOAD
  );
  currentVisiblePosts.forEach(postElement => {
    displayPost(postElement);
  });

//hides button once every post is on the page
 if (currentPostIndex + POSTS_PER_LOAD >= POST_DATA.length) {
    document.getElementById("loadMoreButton").style.display = "none";
  }
}

function displayPost(postElement = {}) {
  const htmlElement = `
    <div class="post">
      <h2>${postElement.title}</h2>
      <p>${postElement.body}</p>
    </div>
  `;
  const containerElement = document.getElementById("container");
  containerElement.insertAdjacentHTML("beforeend", htmlElement);
}

function loadNextPosts() {
  // Stop if there is nothing left to show
  if (currentPostIndex + POSTS_PER_LOAD >= POST_DATA.length) {
    return;
  }
  currentPostIndex += POSTS_PER_LOAD;
  displayPostList();
}

// Endless scroll: load more when the user is within 200px of the bottom
function handleScroll() {
  const distanceFromBottom =
    document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
 
  if (distanceFromBottom < 200) {
    loadNextPosts();
  }
}
 
init();