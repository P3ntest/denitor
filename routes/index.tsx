/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Application } from "../utils/db.ts";
import { tw } from "../utils/twind.ts";

interface LoaderData {
  apps: Application[];
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const name = formData.get("name")! as string;

    await Application.create({
      name,
      token: crypto.randomUUID(),
    });

    return Response.redirect(req.url, 302);
  },
  async GET(req, ctx) {
    const apps = await Application.all();

    return ctx.render({ apps });
  },
};

export default function AboutPage({ data }: PageProps<LoaderData>) {
  return (
    <main>
      <h1 class={tw`text-xl font-bold`}>All Apps</h1>
      <div>
        {data.apps.map((app: Application) => (
          <div class={tw`bg-gray-100 rounded border-2 shadow p-2 m-2`}>
            <h1 class={tw`text-lg`}>{app.name}</h1>
          </div>
        ))}
      </div>
      <form method="post">
        <input type="text" name="name" />
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
