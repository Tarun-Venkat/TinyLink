import './globals.css'

export const metadata = {
  title: 'TinyLink',
  description: 'A Next.js app with MongoDB and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

