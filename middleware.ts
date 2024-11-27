import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const sort = url.searchParams.get('sort');
  const hasSort = ['new', 'old', 'like'].includes(sort as string);

  if (!hasSort) {
    url.searchParams.set('sort', 'new');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
