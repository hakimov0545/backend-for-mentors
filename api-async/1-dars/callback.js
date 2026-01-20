setTimeout(() => {
  console.log("Loading users...");

  setTimeout(() => {
    console.log("Loading posts...");

    setTimeout(() => {
      console.log("Done!");
    }, 1000);
  }, 1000);
}, 1000);
