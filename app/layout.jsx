import './globals.css'

export const metadata = {
  title: 'AI Text Transformer',
  description: 'Transform your text with the power of AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
