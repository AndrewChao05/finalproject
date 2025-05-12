// app/layout.tsx

export const metadata = {
    title: 'My Game',
    description: 'Simple dinosaur game',
  };
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="bg-white text-black">
          {children}
        </body>
      </html>
    );
  }