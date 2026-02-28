const form = document.getElementById('create-page-form');
const workspaceInput = document.getElementById('workspace-id');
const titleInput = document.getElementById('page-title');
const contentInput = document.getElementById('page-content');
const message = document.getElementById('message');
const treeEl = document.getElementById('tree');
const refreshBtn = document.getElementById('refresh-tree');

const flattenTree = (nodes, depth = 0) => {
  const rows = [];
  for (const node of nodes) {
    rows.push({ ...node, depth });
    rows.push(...flattenTree(node.children ?? [], depth + 1));
  }
  return rows;
};

const setMessage = (text, isError = false) => {
  message.textContent = text;
  message.style.color = isError ? '#dc2626' : '#059669';
};

const loadTree = async () => {
  const workspaceId = workspaceInput.value.trim();
  if (!workspaceId) {
    setMessage('请先输入工作空间ID', true);
    return;
  }

  const response = await fetch(`/workspaces/${workspaceId}/tree`);
  if (!response.ok) {
    setMessage('加载页面树失败', true);
    return;
  }

  const tree = await response.json();
  const rows = flattenTree(tree);
  treeEl.innerHTML = rows
    .map((row) => `<li style="padding-left:${row.depth * 18}px">${row.title}</li>`)
    .join('');
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    workspaceId: workspaceInput.value.trim(),
    title: titleInput.value.trim(),
    content: contentInput.value
  };

  if (!payload.workspaceId || !payload.title) {
    setMessage('工作空间ID和标题必填', true);
    return;
  }

  const response = await fetch('/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const result = await response.json();
    setMessage(result.message || '创建失败', true);
    return;
  }

  setMessage('页面创建成功');
  titleInput.value = '';
  contentInput.value = '';
  await loadTree();
});

refreshBtn.addEventListener('click', loadTree);

loadTree();
