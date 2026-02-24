import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test('renders todo items from the API', async ({ page }) => {
    await page.goto('/');

    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toBeVisible();

    const items = todoList.locator('li');
    await expect(items).toHaveCount(10);
  });

  test('displays at least one visible checkbox', async ({ page }) => {
    await page.goto('/');

    const firstCheckbox = page.getByTestId('todo-checkbox-1');
    await expect(firstCheckbox).toBeVisible();
  });
});
