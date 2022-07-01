/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Application } from "../../utils/db.ts";

interface LoaderData {
  app: Application;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const app = await Application.where({ token: ctx.params.token }).first();

    return ctx.render({ app });
  },
};

export default function AppView({ data }: PageProps<LoaderData>) {
  return (
    <main>
      <h1>{data.app.name}</h1>
    </main>
  );
}
