// Types du protocole HTTP/WTF
export interface WtfRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

export interface WtfResponse {
  status(code: number): WtfResponse;
  json(data: unknown): void;
  send(text: string): void;
}

export type WtfHandler = (req: WtfRequest, res: WtfResponse) => void;

// --- Internals ---

interface Route {
  method: string;
  re: RegExp;
  paramNames: string[];
  handler: WtfHandler;
}

// Convertit un chemin Express-style (/:id) en RegExp avec noms de paramètres capturés.
function pathToRegex(path: string): { re: RegExp; paramNames: string[] } {
  const paramNames: string[] = [];
  const pattern = path.replace(/:[^/]+/g, m => {
    paramNames.push(m.slice(1));
    return '([^/]+)';
  });
  return { re: new RegExp(`^${pattern}$`), paramNames };
}

// --- Router factory ---

export function createWtfRouter() {
  const routes: Route[] = [];

  const router = {
    // TODO: implémenter le dispatch
    //
    // Logique attendue :
    //   1. Filtrer les routes dont `re` matche `req.path`
    //   2. Si aucune route ne matche le chemin → retourner false (non géré)
    //   3. Si le chemin matche mais aucune route n'a la bonne méthode → 999 WHO KNOWS, retourner true
    //   4. Sinon → injecter les params capturés dans `req.params`, appeler le handler, retourner true
    dispatch(_req: WtfRequest, _res: WtfResponse): boolean {
      throw new Error('Not implemented');
    },
  };

  function on(method: string) {
    return (path: string, handler: WtfHandler) => {
      const { re, paramNames } = pathToRegex(path);
      routes.push({ method, re, paramNames, handler });
    };
  }

  return {
    router,
    gimme:        on('GIMME'),
    yeet:         on('YEET'),
    overwrite_bro: on('OVERWRITE_BRO'),
    ducktape:     on('DUCKTAPE'),
    yolo_rm_rf:   on('YOLO_RM_RF'),
  };
}
