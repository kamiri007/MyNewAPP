import { PageRepository } from '../../../domain/src/repositories/PageRepository.js';

export class InMemoryPageRepository extends PageRepository {
  constructor() {
    super();
    this.pages = new Map();
  }

  async save(page) {
    this.pages.set(page.id, page);
    return page;
  }

  async findById(id) {
    return this.pages.get(id) ?? null;
  }

  async findByWorkspaceId(workspaceId) {
    return [...this.pages.values()].filter((page) => page.workspaceId === workspaceId);
  }
}
