import'@styles/globals.css'
import Nav from '@components/Nav'
// import Provider from '@components/Provider'
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
        {/* <Provider> */}
        <ClerkProvider>
          <div className='main'>
            <div className='gradient' />
          </div>
  
          <main className='app'>
            <Nav />
            {children}
          </main>
          </ClerkProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
  
  export default RootLayout;