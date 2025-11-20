import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface Step4Props {
    onSubmit: (files: { passportPhoto: File | null, idPhoto: File | null }) => void
    onBack: () => void
    isSubmitting: boolean
}

export function Step4Photo({ onSubmit, onBack, isSubmitting }: Step4Props) {
    const [passportPhoto, setPassportPhoto] = useState<File | null>(null)
    const [idPhoto, setIdPhoto] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ passportPhoto, idPhoto })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Photo Upload</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="passportPhoto">Passport Photo (White background, no glasses)</Label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex h-32 w-32 items-center justify-center rounded-md border border-dashed border-input bg-muted">
                                    {passportPhoto ? (
                                        <img
                                            src={URL.createObjectURL(passportPhoto)}
                                            alt="Passport Preview"
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                    ) : (
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    )}
                                    <Input
                                        id="passportPhoto"
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                        onChange={(e) => handleFileChange(e, setPassportPhoto)}
                                        required
                                    />
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {passportPhoto ? passportPhoto.name : "Click to upload"}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="idPhoto">ID / Old Passport Page</Label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex h-32 w-48 items-center justify-center rounded-md border border-dashed border-input bg-muted">
                                    {idPhoto ? (
                                        <img
                                            src={URL.createObjectURL(idPhoto)}
                                            alt="ID Preview"
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                    ) : (
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    )}
                                    <Input
                                        id="idPhoto"
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                        onChange={(e) => handleFileChange(e, setIdPhoto)}
                                        required
                                    />
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {idPhoto ? idPhoto.name : "Click to upload"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>Back</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
