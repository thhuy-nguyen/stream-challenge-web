export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Simply pass through to the children, which will be the locale-specific layouts
  return children;
}
