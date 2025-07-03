export async function getAllLaunches() {
  const resp = await fetch(`${process.env.BASE_URL}/v4/launches`);
  if (!resp.ok) throw new Error("Failed to fetch launches");
  return resp.json();
}
export async function getRocket(ids: string[]) {
  const rockets = await Promise.all(
    ids.map(async (ele) => {
      const resp = await fetch(`${process.env.BASE_URL}/v4/rockets/${ele}`);
      if (!resp.ok) throw new Error("Failed to fetch launches");
      return resp.json();
    })
  );

  return rockets;
}
export async function getLocation(ids: string[]) {
  const locations = await Promise.all(
    ids.map(async (ele) => {
      const resp = await fetch(`${process.env.BASE_URL}/v4/launchpads/${ele}`);
      if (!resp.ok) throw new Error("Failed to fetch launches");
      return resp.json();
    })
  );

  return locations;
}
export async function getOrbit(ids: string[]) {
  const orbits = await Promise.all(
    ids.map(async (ele) => {
      const resp = await fetch(`${process.env.BASE_URL}/v4/payloads/${ele}`);
      if (!resp.ok) throw new Error("Failed to fetch launches");
      return resp.json();
    })
  );

  return orbits;
}

type LaunchQuery = {
  upcoming?: boolean;
  success?: boolean;
};

export async function getPaginatedLaunches(
  page: number = 1,
  query: LaunchQuery = {},
  limit = 10
) {
  const res = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query,
      options: {
        page,
        limit,
        sort: { date_utc: "desc" },
      },
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch launches");
  return res.json();
}
