import { createLinkAction, deleteLinkAction } from "@/features/link/action";
import { createClient } from "@/lib/supabase/server";

async function getUserLinks() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id);

  return links || [];
}

export async function DashboardPage() {
  const links = await getUserLinks();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gerenciar Links</h1>

      <form
        action={createLinkAction}
        className="mt-6 p-4 border rounded-lg bg-gray-50"
      >
        <h2 className="text-xl font-semibold">Adicionar novo link</h2>
        <div className="mt-4">
          <input
            type="text"
            name="title"
            placeholder="Título do Link (ex: Meu Portfólio)"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mt-2">
          <input
            type="url"
            name="url"
            placeholder="https://..."
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Adicionar link
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Seus links</h2>
        <ul className="mt-4 space-y-2">
          {links.map((link) => (
            <li
              key={link.id}
              className="flex items-center justify-between p-3 bg-white border rounded-lg"
            >
              <span>{link.title}</span>
              <form action={deleteLinkAction.bind(null, link.id)}>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200"
                >
                  Excluir
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
