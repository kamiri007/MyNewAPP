import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { container } from './container.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const webRoot = path.resolve(currentDir, '../../../apps/web/src');

const parseBody = async (req) => {
  let data = '';
  for await (const chunk of req) {
    data += chunk;
  }
  return data ? JSON.parse(data) : {};
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const sendFile = async (res, filePath, contentType) => {
  const content = await readFile(filePath, 'utf8');
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
};

export const createAppServer = () => {
  return createServer(async (req, res) => {
    try {
      if (req.method === 'POST' && req.url === '/pages') {
        const body = await parseBody(req);
        const page = await container.createPageUseCase.execute(body);
        return sendJson(res, 201, {
          id: page.id,
          workspaceId: page.workspaceId,
          parentPageId: page.parentPageId,
          title: page.title.value,
          content: page.content
        });
      }

      if (req.method === 'GET' && req.url?.startsWith('/workspaces/')) {
        const [, , workspaceId, resource] = req.url.split('/');
        if (resource === 'tree') {
          const tree = await container.getWorkspaceTreeUseCase.execute({ workspaceId });
          return sendJson(res, 200, tree);
        }
      }

      if (req.method === 'GET' && req.url === '/app.js') {
        return sendFile(res, path.join(webRoot, 'app.js'), 'text/javascript; charset=utf-8');
      }

      if (req.method === 'GET' && req.url === '/styles.css') {
        return sendFile(res, path.join(webRoot, 'styles.css'), 'text/css; charset=utf-8');
      }

      if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        return sendFile(res, path.join(webRoot, 'index.html'), 'text/html; charset=utf-8');
      }

      return sendJson(res, 404, { message: 'Not found' });
    } catch (error) {
      return sendJson(res, 400, { message: error.message });
    }
  });
};

if (process.argv[1] === currentFilePath) {
  const port = process.env.PORT ?? 3000;
  const server = createAppServer();
  server.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}
