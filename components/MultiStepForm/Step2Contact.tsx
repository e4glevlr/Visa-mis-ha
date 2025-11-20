import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactInfoSchema, ContactInfo } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step2Props {
    defaultValues?: Partial<ContactInfo>
    onNext: (data: ContactInfo) => void
    onBack: () => void
}

export function Step2Contact({ defaultValues, onNext, onBack }: Step2Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactInfo>({
        resolver: zodResolver(contactInfoSchema),
        defaultValues,
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input id="whatsapp" {...register("whatsapp")} placeholder="+1 234 567 890" />
                        {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country of Residence</Label>
                        <select
                            id="country"
                            {...register("country")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select Country</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="USA">USA</option>
                            <option value="Japan">Japan</option>
                            <option value="Korea">Korea</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
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
