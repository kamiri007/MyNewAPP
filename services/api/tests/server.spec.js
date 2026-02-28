import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from '../src/server.js';

const startServer = () =>
  new Promise((resolve) => {
    const server = createAppServer();
    server.listen(0, () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });

test('server serves web index page', async () => {
  const { server, baseUrl } = await startServer();
  try {
    const response = await fetch(`${baseUrl}/`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /Workspace/);
  } finally {
    server.close();
  }
});

test('server creates page and returns workspace tree', async () => {
  const { server, baseUrl } = await startServer();
  try {
    const createResponse = await fetch(`${baseUrl}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId: 'ws-test', title: 'Home', content: 'Hello' })
    });

    assert.equal(createResponse.status, 201);

    const treeResponse = await fetch(`${baseUrl}/workspaces/ws-test/tree`);
    const tree = await treeResponse.json();

    assert.equal(treeResponse.status, 200);
    assert.equal(tree[0].title, 'Home');
  } finally {
    server.close();
  }
});
