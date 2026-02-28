import test from 'node:test';
import assert from 'node:assert/strict';
import { flattenTree, validateCreatePageInput } from '../../src/view-models/workspaceTreeViewModel.js';

test('flattenTree flattens nested tree with depth', () => {
  const rows = flattenTree([
    {
      id: 'root',
      title: 'Root',
      children: [{ id: 'child', title: 'Child', children: [] }]
    }
  ]);

  assert.deepEqual(rows, [
    { id: 'root', title: 'Root', depth: 0 },
    { id: 'child', title: 'Child', depth: 1 }
  ]);
});

test('validateCreatePageInput validates required fields', () => {
  assert.deepEqual(validateCreatePageInput({ workspaceId: '', title: 'x' }), {
    valid: false,
    message: 'workspaceId 必填。'
  });
  assert.deepEqual(validateCreatePageInput({ workspaceId: 'ws-1', title: '' }), {
    valid: false,
    message: '标题不能为空。'
  });
  assert.deepEqual(validateCreatePageInput({ workspaceId: 'ws-1', title: 'OK' }), {
    valid: true
  });
});
