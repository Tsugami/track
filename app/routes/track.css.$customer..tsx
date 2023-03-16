import type { LoaderArgs } from "@remix-run/server-runtime";

export async function loader(_: LoaderArgs) {
  throw new Response("button { color: red; }", {
    status: 200,
    headers: {
      "Content-Type": "text/css",
    },
  });
}
