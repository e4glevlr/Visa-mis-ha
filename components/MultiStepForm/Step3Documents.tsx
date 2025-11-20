import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { documentInfoSchema, DocumentInfo } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step3Props {
    defaultValues?: Partial<DocumentInfo>
    onNext: (data: DocumentInfo) => void
    onBack: () => void
}

export function Step3Documents({ defaultValues, onNext, onBack }: Step3Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DocumentInfo>({
        resolver: zodResolver(documentInfoSchema),
        defaultValues,
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="idNumber">ID / Old Passport Number</Label>
                        <Input id="idNumber" {...register("idNumber")} placeholder="A12345678" />
                        {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber.message}</p>}
                    </div>

                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                        <Button type="submit">Next</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
