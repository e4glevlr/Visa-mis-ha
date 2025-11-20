"use client"

import { useState } from "react"
import { Step1Personal } from "./Step1Personal"
import { Step2Contact } from "./Step2Contact"
import { Step3Documents } from "./Step3Documents"
import { Step4Photo } from "./Step4Photo"
import { PersonalInfo, ContactInfo, DocumentInfo } from "@/lib/schema"
import { supabase } from "@/lib/supabase"

export function MultiStepForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<Partial<PersonalInfo & ContactInfo & DocumentInfo>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleNextStep1 = (data: PersonalInfo) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setStep(2)
    }

    const handleNextStep2 = (data: ContactInfo) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setStep(3)
    }

    const handleNextStep3 = (data: DocumentInfo) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setStep(4)
    }

    const handleSubmit = async (files: { passportPhoto: File | null, idPhoto: File | null }) => {
        setIsSubmitting(true)

        try {
            // 1. Upload Passport Photo
            let passportPhotoPath = ""
            if (files.passportPhoto) {
                const fileExt = files.passportPhoto.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `passport-photos/${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('documents')
                    .upload(filePath, files.passportPhoto)

                if (uploadError) throw uploadError
                passportPhotoPath = filePath
            }

            // 2. Upload ID Photo
            let idPhotoPath = ""
            if (files.idPhoto) {
                const fileExt = files.idPhoto.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `id-photos/${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('documents')
                    .upload(filePath, files.idPhoto)

                if (uploadError) throw uploadError
                idPhotoPath = filePath
            }

            // 3. Prepare Final Data
            const finalData = {
                ...formData,
                passport_photo_path: passportPhotoPath,
                id_photo_path: idPhotoPath,
                status: 'pending'
            }

            // 4. Send to API
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            })

            if (!response.ok) throw new Error('Failed to submit application')

            alert("Application Submitted Successfully!")
            // Reset form or redirect
            setStep(1)
            setFormData({})
        } catch (error) {
            console.error("Error submitting application:", error)
            alert("Error submitting application. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        setStep((prev) => prev - 1)
    }

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span className={step >= 1 ? "text-primary" : ""}>Step 1: Personal</span>
                    <span className={step >= 2 ? "text-primary" : ""}>Step 2: Contact</span>
                    <span className={step >= 3 ? "text-primary" : ""}>Step 3: Docs</span>
                    <span className={step >= 4 ? "text-primary" : ""}>Step 4: Photo</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
            </div>

            {step === 1 && <Step1Personal defaultValues={formData} onNext={handleNextStep1} />}
            {step === 2 && <Step2Contact defaultValues={formData} onNext={handleNextStep2} onBack={handleBack} />}
            {step === 3 && <Step3Documents defaultValues={formData} onNext={handleNextStep3} onBack={handleBack} />}
            {step === 4 && <Step4Photo onSubmit={handleSubmit} onBack={handleBack} isSubmitting={isSubmitting} />}
        </div>
    )
}
