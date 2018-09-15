console.log("hello world");
fetch("./data")
  .then(res => res.json())
  .then(console.log);
