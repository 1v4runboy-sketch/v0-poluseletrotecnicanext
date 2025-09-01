"use client"
import type React from "react"
type P = React.SVGProps<SVGSVGElement> & { size?: number }
export const ChevronLeft = ({ size = 20, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path
      d="M15 18l-6-6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export const ChevronRight = ({ size = 20, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path
      d="M9 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export const CartIcon = ({ size = 22, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M6 6h15l-1.5 9h-12z" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
)
export const MenuIcon = ({ size = 22, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
export const InstagramIcon = ({ size = 22, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <defs>
      <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f58529" />
        <stop offset="0.5" stopColor="#dd2a7b" />
        <stop offset="1" stopColor="#8134af" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#ig)" />
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="2" />
    <circle cx="17" cy="7" r="1.2" fill="white" />
  </svg>
)
export const WhatsIcon = ({ size = 22, ...props }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <defs>
      <linearGradient id="wa" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#25D366" />
        <stop offset="1" stopColor="#128C7E" />
      </linearGradient>
    </defs>
    <path d="M12 2a10 10 0 00-8.94 14.61L2 22l5.55-1.46A10 10 0 1012 2z" fill="url(#wa)" />
    <path
      d="M8 9.5c.3 3 3.5 5.6 5.8 5.8.6.06 1.3-.1 1.5-.6l.5-1.1c.1-.3 0-.6-.2-.8l-1-.7c-.2-.2-.5-.2-.8-.1l-.7.3a.9.9 0 01-.9-.2l-1.6-1.6a.9.9 0 01-.2-.9l.3-.7c.1-.3 0-.6-.1-.8l-.7-1c-.2-.2-.5-.3-.8-.2l-1.1.5c-.5.2-.7.9-.6 1.5z"
      fill="white"
    />
  </svg>
)

export const IconInsta = InstagramIcon
export const IconWhats = WhatsIcon
