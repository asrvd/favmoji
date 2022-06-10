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
          <link rel="icon" href="https://favmoji.asheeshh.workers.dev/🌸" />
        </head>
        <body>
          <pre>
            <p>example request: <a href="https://favmoji.asheeshh.workers.dev/🌸">https://favmoji.asheeshh.workers.dev/🌸</a></p>
            <p>example usage as favicon: &lt;link rel="icon" href="https://favmoji.asheeshh.workers.dev/🌸" /&gt;</p>
          </pre>
        </body>
      `,
        {
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        }
      );
    }
    const emoji = parse(path);
    return fetch(emoji[0].url);
  },
};