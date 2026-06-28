import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rune-panel max-w-md rounded-xl p-10 text-center">
        <h1 className="font-display text-6xl text-glow text-primary">404</h1>
        <h2 className="mt-3 text-lg text-foreground">Página perdida nas brumas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O pergaminho que você buscava se desfez no éter.
        </p>
        <a
          href="/"
          className="neon-btn hover:[box-shadow:var(--glow-neon)] mt-6 inline-block rounded-md px-5 py-2 text-sm font-medium"
        >
          Voltar ao salão
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rune-panel max-w-md rounded-xl p-8 text-center">
        <h1 className="font-display text-2xl text-primary text-glow">Um feitiço falhou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado ao conjurar esta página. Tente novamente ou volte ao salão.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="neon-btn rounded-md px-4 py-2 text-sm font-medium"
          >
            Conjurar novamente
          </button>
          <a
            href="/"
            className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Salão principal
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arcanum — Forja de Fichas de RPG" },
      {
        name: "description",
        content:
          "Monte fichas de RPG automatizadas para D&D 5.5 e sistemas autorais. Tema de fantasia medieval com toque neon arcano.",
      },
      { property: "og:title", content: "Arcanum — Forja de Fichas de RPG" },
      {
        property: "og:description",
        content: "Crie personagens em poucos passos. D&D 5.5, Dreowacis, Quebra do Tempo e mais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
