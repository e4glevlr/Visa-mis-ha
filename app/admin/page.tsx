import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

async function getApplications() {
    const { data, error } = await supabaseAdmin
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching applications:', error)
        return []
    }

    // Generate signed URLs for images
    const applicationsWithSignedUrls = await Promise.all(
        (data || []).map(async (app) => {
            let passportPhotoUrl = null
            let idPhotoUrl = null

            if (app.passport_photo_path) {
                const { data: passportData } = await supabaseAdmin
                    .storage
                    .from('documents')
                    .createSignedUrl(app.passport_photo_path, 3600) // 1 hour expiry
                passportPhotoUrl = passportData?.signedUrl
            }

            if (app.id_photo_path) {
                const { data: idData } = await supabaseAdmin
                    .storage
                    .from('documents')
                    .createSignedUrl(app.id_photo_path, 3600)
                idPhotoUrl = idData?.signedUrl
            }

            return {
                ...app,
                passportPhotoUrl,
                idPhotoUrl,
            }
        })
    )

    return applicationsWithSignedUrls
}

async function checkAuth() {
    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.get('admin_auth')

    if (!isAuthenticated) {
        redirect('/admin/login')
    }
}

export default async function AdminDashboard() {
    await checkAuth()
    const applications = await getApplications()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage passport applications</p>
                </div>
                <form action="/api/admin/logout" method="POST">
                    <Button variant="outline">Logout</Button>
                </form>
            </div>

            <div className="grid gap-4">
                {applications.length === 0 ? (
                    <Card>
                        <CardContent className="py-10 text-center">
                            <p className="text-muted-foreground">No applications yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    applications.map((app: any) => (
                        <Card key={app.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{app.full_name}</span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        app.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                            app.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {app.status}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 text-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-medium">Email:</span> {app.email}
                                        </div>
                                        <div>
                                            <span className="font-medium">WhatsApp:</span> {app.whatsapp}
                                        </div>
                                        <div>
                                            <span className="font-medium">DOB:</span> {new Date(app.dob).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Country:</span> {app.country}
                                        </div>
                                        <div>
                                            <span className="font-medium">ID Number:</span> {app.id_number}
                                        </div>
                                        <div>
                                            <span className="font-medium">Applied:</span> {new Date(app.created_at).toLocaleDateString()}
                                        </div>
                                    </div>

                                    {app.passportPhotoUrl && (
                                        <div className="mt-4">
                                            <span className="font-medium block mb-2">Passport Photo:</span>
                                            <div className="relative h-48 w-full max-w-[300px]">
                                                <Image
                                                    src={app.passportPhotoUrl}
                                                    alt="Passport Photo"
                                                    fill
                                                    className="object-contain rounded-md border"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {app.idPhotoUrl && (
                                        <div className="mt-4">
                                            <span className="font-medium block mb-2">ID Photo:</span>
                                            <div className="relative h-48 w-full max-w-[300px]">
                                                <Image
                                                    src={app.idPhotoUrl}
                                                    alt="ID Photo"
                                                    fill
                                                    className="object-contain rounded-md border"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-4 flex gap-2">
                                        <form action="/api/admin/update-status" method="POST">
                                            <input type="hidden" name="id" value={app.id} />
                                            <input type="hidden" name="status" value="processing" />
                                            <Button type="submit" size="sm" variant="outline" disabled={app.status !== 'pending'}>
                                                Mark Processing
                                            </Button>
                                        </form>
                                        <form action="/api/admin/update-status" method="POST">
                                            <input type="hidden" name="id" value={app.id} />
                                            <input type="hidden" name="status" value="completed" />
                                            <Button type="submit" size="sm" variant="default" disabled={app.status === 'completed'}>
                                                Mark Completed
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
