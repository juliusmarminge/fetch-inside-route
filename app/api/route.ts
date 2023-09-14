export const GET = async (req: Request) => {
  return new Response("Hello world!", { status: 200 });
};

async function devHook() {
  console.log("Simulating dev hook...");
  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: JSON.stringify({ bar: "baz" }),
    headers: {
      "x-my-hook": "foo",
    },
  });

  const text = await response.text();
  console.log("hook returned", response.status, text);
  if (response.ok) {
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
    return new Response(JSON.stringify(json), { status: 200 });

    // do the actual thing
  }

  switch (action) {
    case "upload": {
      // do some work

      if (process.env.NODE_ENV === "development") {
        await devHook();
      }

      return new Response("Uploaded!", { status: 200 });
    }
  }
  return new Response("Hello world!", { status: 200 });
};
