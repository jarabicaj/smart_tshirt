export const start = () => {
  console.log("start");
  fetch("/api/start", {
    method: "POST"
  });
};

export const stop = () => {
  console.log("stop");
  fetch("/api/stop", {
    method: "POST"
  });
};

export const getData = async from => {
  console.log("getData", from);
  const res = await fetch(`/api/data?from=${from}`, {
    method: "GET"
  });
  const data = await res.json();
  return data;
};
