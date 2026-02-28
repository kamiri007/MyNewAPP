import { Page } from '../../../domain/src/entities/Page.js';

export class CreatePageUseCase {
  constructor({ pageRepository, idGenerator }) {
    this.pageRepository = pageRepository;
    this.idGenerator = idGenerator;
  }

  async execute({ workspaceId, parentPageId, title, content }) {
    const page = new Page({
      id: this.idGenerator(),
      workspaceId,
      parentPageId,
      title,
      content
    });

    await this.pageRepository.save(page);
    return page;
  }
}
