import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
    try {
        // Check auth
        const cookieStore = await cookies()
        const isAuthenticated = cookieStore.get('admin_auth')

        if (!isAuthenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const id = formData.get('id') as string
        const status = formData.get('status') as string

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
        }

        const { error } = await supabaseAdmin
            .from('applications')
            .update({ status })
            .eq('id', id)

        if (error) {
            console.error('Update error:', error)
            return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

    redirect('/admin')
}
