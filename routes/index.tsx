/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Todo } from "../utils/db.ts";

interface LoaderData {
  todos: Todo[];
}

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const name = formData.get("name")! as string;

    await Todo.create({ name });

    return Response.redirect(req.url, 302);
  },
  async GET(req, ctx) {
    const todos = await Todo.all();

    return ctx.render({ todos });
  },
};

export default function AboutPage({ data }: PageProps<LoaderData>) {
  return (
    <main>
      {JSON.stringify(data)}
      <ul>
        {data.todos.map((todo: Todo) => (
          <li>{todo.name}</li>
        ))}
      </ul>
      <form method="post">
        <input type="text" name="name" />
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
