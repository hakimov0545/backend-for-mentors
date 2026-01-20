fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) =>
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${users[0].id}`),
  )
  .then((res) => res.json())
  .then((posts) => {
    posts.slice(0, 5).forEach((post) => {
      console.log(post.title);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
