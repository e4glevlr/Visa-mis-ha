"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
    const phoneNumber = "+1234567890" // Replace with your WhatsApp number
    const message = "Hi, I need help with my passport application"

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle className="h-6 w-6" />
        </button>
    )
}
