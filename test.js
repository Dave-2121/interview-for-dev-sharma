async function run() {
  const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: {
        date_utc: {
          $gte: "2022-01-01T00:00:00.000Z",
          $lte: "2024-12-31T00:00:00.000Z",
        },
      },
      options: {
        page: 1,
        limit: 5,
        sort: { date_utc: "desc" },
      },
    }),
  });

  const data = await res.json();
  console.log(data);
}

run();
