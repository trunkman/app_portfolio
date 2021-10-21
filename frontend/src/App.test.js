import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from "msw"
import { setupServer } from "msw/node"
import App from './App';

const spyFetch = jest.spyOn(window, "fetch")
const UserInfoMock = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  password: 'foobar',
  admin: 'true',
  activated: 'true'
}
const server = setupServer(
  // apiでリクエストするモックを設定
  rest.get('api/v1/user/:userId', (req, res, ctx) => {
    return res(
      ctx.json({
        user: UserInfoMock
      }),
    )
  }),
  rest.post('api/v1/login', (req, res, ctx) => {
    return res(
      ctx.json({
        logged_in: 'true',
        user: UserInfoMock
      }),
    )
  }),
)

describe('ログイン機構', () => {
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })

  test('ログインした後、ページが変更するか', async () => {
    render(<App />);

    // 未ログインのHOME画面が表示されているか
    expect(screen.queryByText('フォロー')).toBeNull()
    expect(screen.queryByText('マイページ')).toBeNull()
    const loginButtons = screen.getAllByText('ログイン')
    expect(loginButtons.length).toBe(2)

    // クリック後、ログインDialogが表示されているか
    const loginButton = screen.getAllByText('ログイン')[0]
    userEvent.click(loginButton)
    await screen.findByRole('dialog')

    // E-mailとパスワードを入力し、クリックする
    userEvent.type(screen.getByText('E-mail', `alice@example.com`));
    userEvent.type(screen.getByText('パスワード', `foobar`));
    const submitButton = screen.getByText('ログインする')
    userEvent.click(submitButton)

    // msw.jsのrespomse#onceを使って更新し後のデータがmockできるようにする
    const newResponse = {
      logged_in: 'true',
      user: UserInfoMock
    }

    server.use(
      rest.get('api/v1/user/:userId', (_, res, ctx) => {
        return res.once(ctx.json(newResponse))
      })
    )

    // 画面を通して更新apiへリクエストした内容が期待通りになっているか
    await waitFor(() => {
      const calledUserApi = spyFetch.mock.calls.find(item =>
        item[0] === `api/v1/login` &&
        item[1]?.method === 'POST'
      )
      // 更新の時に送ったリクエスト内容のテスト
      // if (!calledUserApi || !calledUserApi[1]) {
      //   throw new Error("The request for users/:userId couldn't be found")
      // }
      const reqBody = JSON.parse(calledUserApi[1].body)
      expect(reqBody).toStrictEqual({
        user: {
          email: 'alice@example.com',
          password: 'foobar',
          remenber_me: '1'
        }
      })
    })

    // 更新後にダイアログが消える
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDoc
    })

    //ログイン後のUser画面になっているか
    expect(screen.findByText('ユーザーページ')).toBeInTheDocument();
    expect(screen.findByText('マイページ')).toBeInTheDocument();
    expect(screen.findByText('フォロー')).toBeInTheDocument();

    // ログイン後のユーザー画面が表示されているか
    screen.debug();
  });
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
