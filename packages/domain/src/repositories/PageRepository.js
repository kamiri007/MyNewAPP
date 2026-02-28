export class PageRepository {
  async save(_page) {
    throw new Error('save() must be implemented.');
  }

  async findById(_id) {
    throw new Error('findById() must be implemented.');
  }

  async findByWorkspaceId(_workspaceId) {
    throw new Error('findByWorkspaceId() must be implemented.');
  }
}
