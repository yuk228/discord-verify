import { NextResponse } from 'next/server'

export interface Response<T> {
  data?: T
}

export function Ok<T>(data?: T): NextResponse<T | Record<string, never>> {
  return NextResponse.json(data ?? {}, { status: 200 })
}

export function Created<T>(data?: T): NextResponse<T | Record<string, never>> {
  return NextResponse.json(data ?? {}, { status: 201 })
}

export function Updated<T>(data?: T): NextResponse<T | Record<string, never>> {
  return NextResponse.json(data ?? {}, { status: 200 })
}

export interface ErrorResponse {
  message?: string
}

export function NotFound(): NextResponse<ErrorResponse> {
  return NextResponse.json({ message: 'Resource Not Found' }, { status: 404 })
}

export function BadRequest(): NextResponse<ErrorResponse> {
  return NextResponse.json({ message: 'BadRequest' }, { status: 401 })
}

export function Unauthorized(): NextResponse<ErrorResponse> {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}

export function Forbidden(): NextResponse<ErrorResponse> {
  return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
}

export function UnprocessableEntity(): NextResponse<ErrorResponse> {
  return NextResponse.json({ message: 'Unprocessable Entity' }, { status: 422 })
}

export function InternalServerError(): NextResponse<ErrorResponse> {
  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 }
  )
}
