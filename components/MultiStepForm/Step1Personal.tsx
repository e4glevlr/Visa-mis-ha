import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { personalInfoSchema, PersonalInfo } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step1Props {
    defaultValues?: Partial<PersonalInfo>
    onNext: (data: PersonalInfo) => void
}

export function Step1Personal({ defaultValues, onNext }: Step1Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInfo>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues,
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" {...register("dob")} />
                        {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pob">Place of Birth</Label>
                        <Input id="pob" {...register("pob")} placeholder="City, Country" />
                        {errors.pob && <p className="text-sm text-destructive">{errors.pob.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            id="gender"
                            {...register("gender")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
                    </div>

                    <Button type="submit" className="w-full">Next</Button>
                </form>
            </CardContent>
        </Card>
    )
}
