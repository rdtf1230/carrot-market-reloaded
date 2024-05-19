import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-carrot',
    // !는 반드시 존재한다는 뜻
    password: process.env.COOKIE_PASSWORD!,
  });
}
