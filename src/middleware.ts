
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublic = path === '/dashbord/login' || path === '/dashbord/signup'

  const token = request.cookies.get('token')?.value || ''

  if(isPublic && token) {
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if(!isPublic && !token) {
    return NextResponse.redirect(new URL('/dashbord/login',request.nextUrl))
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/admin',
    '/admin/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/dashbord/login',
    '/dashbord/signup',
]
}