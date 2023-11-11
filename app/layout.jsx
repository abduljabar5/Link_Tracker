import Provider from '@/components/Provider'
import '../globals.css'
import Nav from '@/components/Nav'


export const metadata = {
  title: 'Link Tracker',
  description: 'Track your link for free!!!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider>
          <Nav />
          {children}
          </Provider>
          </body>
    </html>
  )
}
 