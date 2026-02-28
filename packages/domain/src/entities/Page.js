import { Title } from '../value-objects/Title.js';

export class Page {
  constructor({ id, workspaceId, parentPageId = null, title, content = '', createdAt = new Date() }) {
    if (!id || !workspaceId) {
      throw new Error('Page id and workspaceId are required.');
    }

    this.id = id;
    this.workspaceId = workspaceId;
    this.parentPageId = parentPageId;
    this.title = title instanceof Title ? title : new Title(title);
    this.content = content;
    this.createdAt = createdAt;
  }

  rename(newTitle) {
    this.title = newTitle instanceof Title ? newTitle : new Title(newTitle);
  }

  updateContent(content) {
    this.content = content;
  }
}
