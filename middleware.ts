import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

// 배열보다 객체에서 찾는게 약간 더 빠름
// 배열이 커지면 배열의 모든 요소를 순환해야하기 때문
const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      // return NextResponse.redirect(new URL('/products', request.url));
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }
}

export const config = {
  // 정규표현식에 해당하는것 외에 전부 미들웨어 동작,
  // 정규표현식에 속하는 url일때 동작하는 방식이 아님
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
