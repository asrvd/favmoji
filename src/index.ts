import { parse } from "twemoji-parser";

export interface Env {}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname).replace("/", "");
    if (path.length === 0) {
      return new Response(
        `
        <head>
          <title>favmoji</title>
          <meta charset="utf-8">
          <link rel="icon" href="https://favmoji.asheeshh.ga/🌸" />
        </head>
        <body>
          <pre>
            <p>example request: <a href="https://favmoji.asheeshh.ga/🌸">https://favmoji.asheeshh.ga/🌸</a></p>
            <p>example usage as favicon: &lt;link rel="icon" href="https://favmoji.asheeshh.ga/🌸" /&gt;</p>
          </pre>
        </body>
        <style>
          a {
            text-decoration: none;
          }
        </style>
      `,
        {
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        }
      );
    }
    const emoji = parse(path);
    if (emoji.length === 0) {
      return new Response("No emoji found in given request", {
        status: 404,
      });
    } else {
      return fetch(emoji[0].url);
    }
  },
};
