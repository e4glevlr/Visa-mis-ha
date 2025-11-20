import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { applicationSchema } from '@/lib/schema'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate data on server side
        // Note: We need to extend the schema to allow the file paths which are added in the frontend
        // or just validate the base fields.
        // For now, we'll skip strict zod parsing of the full body including paths, 
        // but in production you should validate everything.

        const { passport_photo_path, id_photo_path, status, ...formData } = body

        // Validate form data
        const validationResult = applicationSchema.safeParse(formData)
        if (!validationResult.success) {
            return NextResponse.json({ error: 'Invalid data', details: validationResult.error }, { status: 400 })
        }

        // Save to Supabase
        const { data, error } = await supabase
            .from('applications')
            .insert([
                {
                    ...formData,
                    passport_photo_path,
                    id_photo_path,
                    status: status || 'pending',
                    dob: new Date(formData.dob), // Ensure date format
                }
            ])
            .select()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }

        // Send Email (if API key exists)
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'Passport Service <onboarding@resend.dev>',
                    to: formData.email,
                    subject: 'Application Received',
                    html: `<p>Hi ${formData.fullName},</p><p>We have received your passport application. We will review it shortly.</p>`,
                })
            } catch (emailError) {
                console.error('Email error:', emailError)
                // Don't fail the request if email fails
            }
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
