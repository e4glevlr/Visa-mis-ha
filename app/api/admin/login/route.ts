import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json()

        // Simple auth check (In production, use Supabase Auth or similar)
        const validUsername = process.env.ADMIN_USERNAME || 'admin'
        const validPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (username === validUsername && password === validPassword) {
            const cookieStore = await cookies()
            cookieStore.set('admin_auth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
