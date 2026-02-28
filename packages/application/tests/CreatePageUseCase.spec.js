import test from 'node:test';
import assert from 'node:assert/strict';
import { CreatePageUseCase } from '../src/use-cases/CreatePageUseCase.js';
import { GetWorkspaceTreeUseCase } from '../src/use-cases/GetWorkspaceTreeUseCase.js';
import { InMemoryPageRepository } from '../../infrastructure/src/repositories/InMemoryPageRepository.js';

test('CreatePageUseCase creates a page with valid title', async () => {
  const pageRepository = new InMemoryPageRepository();
  const useCase = new CreatePageUseCase({
    pageRepository,
    idGenerator: () => 'page-1'
  });

  const page = await useCase.execute({
    workspaceId: 'workspace-1',
    title: 'Roadmap',
    content: 'Q1 planning'
  });

  assert.equal(page.id, 'page-1');
  assert.equal(page.title.value, 'Roadmap');
});

test('GetWorkspaceTreeUseCase returns nested structure', async () => {
  const pageRepository = new InMemoryPageRepository();
  const createPage = new CreatePageUseCase({
    pageRepository,
    idGenerator: (() => {
      let i = 0;
      return () => `page-${++i}`;
    })()
  });
  const getWorkspaceTree = new GetWorkspaceTreeUseCase({ pageRepository });

  await createPage.execute({ workspaceId: 'ws-1', title: 'Root' });
  await createPage.execute({ workspaceId: 'ws-1', title: 'Child', parentPageId: 'page-1' });

  const tree = await getWorkspaceTree.execute({ workspaceId: 'ws-1' });

  assert.equal(tree.length, 1);
  assert.equal(tree[0].title, 'Root');
  assert.equal(tree[0].children[0].title, 'Child');
});
