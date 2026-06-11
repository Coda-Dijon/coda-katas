import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

type WtfHandler = (req: Request, res: Response) => void;

interface Route {
  method: string;
  re: RegExp;
  paramNames: string[];
  handler: WtfHandler;
}

function pathToRegex(path: string): { re: RegExp; paramNames: string[] } {
  const paramNames: string[] = [];
  const pattern = path.replace(/:[^/]+/g, m => {
    paramNames.push(m.slice(1));
    return '([^/]+)';
  });
  return { re: new RegExp(`^${pattern}$`), paramNames };
}

export function createWtfRouter() {
  const routes: Route[] = [];
  const router = Router();

  // Single use() that dispatches all WTF verbs — router.all() would reject custom method names
  router.use((req: Request, res: Response, next: NextFunction) => {
    const pathMatches = routes.filter(r => r.re.test(req.path));
    if (pathMatches.length === 0) return next();

    const route = pathMatches.find(r => r.method === req.method);
    if (!route) return void res.status(999).json({ error: 'WHO KNOWS' });

    const match = req.path.match(route.re)!;
    route.paramNames.forEach((name, i) => { req.params[name] = match[i + 1]; });
    route.handler(req, res);
  });

  function on(method: string) {
    return (path: string, handler: WtfHandler) => {
      const { re, paramNames } = pathToRegex(path);
      routes.push({ method, re, paramNames, handler });
    };
  }

  return {
    router,
    gimme: on('GIMME'),
    yeet: on('YEET'),
    overwrite_bro: on('OVERWRITE_BRO'),
    ducktape: on('DUCKTAPE'),
    yolo_rm_rf: on('YOLO_RM_RF'),
  };
}
