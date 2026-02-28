export const flattenTree = (nodes, depth = 0) => {
  const rows = [];

  for (const node of nodes) {
    rows.push({ id: node.id, title: node.title, depth });
    rows.push(...flattenTree(node.children ?? [], depth + 1));
  }

  return rows;
};

export const validateCreatePageInput = ({ workspaceId, title }) => {
  if (!workspaceId || typeof workspaceId !== 'string') {
    return { valid: false, message: 'workspaceId 必填。' };
  }

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { valid: false, message: '标题不能为空。' };
  }

  return { valid: true };
};
