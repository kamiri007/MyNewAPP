export class GetWorkspaceTreeUseCase {
  constructor({ pageRepository }) {
    this.pageRepository = pageRepository;
  }

  async execute({ workspaceId }) {
    const pages = await this.pageRepository.findByWorkspaceId(workspaceId);
    const byParent = new Map();

    for (const page of pages) {
      const key = page.parentPageId ?? 'root';
      if (!byParent.has(key)) {
        byParent.set(key, []);
      }
      byParent.get(key).push(page);
    }

    const buildTree = (parentId = 'root') => {
      const children = byParent.get(parentId) ?? [];
      return children.map((page) => ({
        id: page.id,
        title: page.title.value,
        children: buildTree(page.id)
      }));
    };

    return buildTree();
  }
}
