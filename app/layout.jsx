import "./globals.css";

export const metadata = {
  title: "Futuristic AI Infra",
  description: "A high-tech landing hero inspired by modal.com"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-base">
      <body className="min-h-screen bg-base text-white antialiased">
        {children}
      </body>
    </html>
  );
}
