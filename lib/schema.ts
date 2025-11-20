import { z } from "zod"

export const personalInfoSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Valid date of birth is required" }),
    pob: z.string().min(2, "Place of birth is required"),
    gender: z.enum(["Male", "Female", "Other"]),
})

export const contactInfoSchema = z.object({
    email: z.string().email("Invalid email address"),
    whatsapp: z.string().min(8, "WhatsApp number is required"),
    country: z.string().min(2, "Country is required"),
})

export const documentInfoSchema = z.object({
    idNumber: z.string().min(5, "ID/Passport number is required"),
})

// Combined schema for final submission (excluding files for now as they are handled separately or as strings)
export const applicationSchema = personalInfoSchema.merge(contactInfoSchema).merge(documentInfoSchema)

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type ContactInfo = z.infer<typeof contactInfoSchema>
export type DocumentInfo = z.infer<typeof documentInfoSchema>
export type ApplicationData = z.infer<typeof applicationSchema>
