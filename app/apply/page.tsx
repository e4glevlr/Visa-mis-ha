import { MultiStepForm } from "@/components/MultiStepForm/MultiStepForm"

export default function ApplyPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Passport Application</h1>
                <p className="text-muted-foreground">Complete the form below to apply for your passport.</p>
            </div>
            <MultiStepForm />
        </div>
    )
}
