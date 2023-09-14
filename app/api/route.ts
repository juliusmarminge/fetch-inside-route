export const runtime = "edge";
// export const runtime = "nodejs";

async function devHook() {
  console.log("Simulating dev hook...");
  console.time("hook fetch time");
  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: JSON.stringify({ bar: "baz" }),
    headers: {
      "x-my-hook": "foo",
    },
  });
  console.timeEnd("hook fetch time");

  console.log("hook returned", response.status, `"${await response.text()}"`);
  if (
    response.ok &&
    response.status < 400 &&
    response.headers.has("x-api-version")
  ) {
    console.log("hook success");
  } else {
    console.log("hook failed");
  }
}

export const POST = async (req: Request) => {
  const hook = req.headers.get("x-my-hook");
  const action = new URL(req.url).searchParams.get("action");

  if (hook) {
    const json = await req.json();
    console.log("RUNNING OUR HOOK", json);
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "x-api-version": "1.0.0" },
    });

    // do the actual thing
  }

  switch (action) {
    case "upload": {
      // do some work

      if (process.env.NODE_ENV === "development") {
        await devHook();
      }

      return new Response("Uploaded!", {
        status: 200,
        headers: { "x-api-version": "1.0" },
      });
    }
  }
  return new Response("Hello world!", {
    status: 200,
    headers: { "x-api-version": "1.0" },
  });
};
