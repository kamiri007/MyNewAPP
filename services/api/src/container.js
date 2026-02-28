import { randomUUID } from 'node:crypto';
import { CreatePageUseCase } from '../../../packages/application/src/use-cases/CreatePageUseCase.js';
import { GetWorkspaceTreeUseCase } from '../../../packages/application/src/use-cases/GetWorkspaceTreeUseCase.js';
import { InMemoryPageRepository } from '../../../packages/infrastructure/src/repositories/InMemoryPageRepository.js';

const pageRepository = new InMemoryPageRepository();

export const container = {
  pageRepository,
  createPageUseCase: new CreatePageUseCase({
    pageRepository,
    idGenerator: randomUUID
  }),
  getWorkspaceTreeUseCase: new GetWorkspaceTreeUseCase({ pageRepository })
};
