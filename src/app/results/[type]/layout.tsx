import Script from 'next/script';

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
        type="module"
        strategy="lazyOnload"
      />
      <div>{children}</div>
    </div>
  );
}
