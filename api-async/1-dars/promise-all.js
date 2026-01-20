const getUsers = new Promise((resolve) => {
  setTimeout(() => resolve("Users list"), 1000);
});

const getPosts = new Promise((resolve) => {
  setTimeout(() => resolve("Posts list"), 1000);
});

const getComments = new Promise((resolve) => {
  setTimeout(() => resolve("Comments list"), 1000);
});

Promise.all([getUsers, getPosts, getComments])
  .then(([users, posts, comments]) => {
    console.log("Users:", users);
    console.log("Posts:", posts);
    console.log("Comments:", comments);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
