import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    // 未ログインのHOME画面であることを確認
    expect(screen.queryByText('マイページ')).toBeNull();
    expect(screen.queryByText('フォロー')).toBeNull();

    // 新規登録を行う
    // const loginButton = screen.getAllByText('ログイン')[0];
    userEvent.click(screen.getByText('新規登録',));
    expect(screen.getByRole('dialog')).toBeVisible();
    userEvent.type(screen.getByLabelText('名前', 'test'));
    userEvent.type(screen.getByLabelText('E-mail', 'test@example.com'));
    userEvent.type(screen.getByLabelText('パスワード', 'foobar'));
    userEvent.type(screen.getByLabelText('パスワードの確認', 'foobar'));
    userEvent.click(screen.getByText('登録する'));

    screen.debug();

    // await expect(screen.findByText('マイページ')).toBeInTheDocument();

  });
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
