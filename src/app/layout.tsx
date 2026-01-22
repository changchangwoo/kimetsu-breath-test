import { metadata as siteMetdata } from '@/constants/Metadata';
import { PageTransitionProvider } from '@/contexts/PageTransitionContext';
import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = siteMetdata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="KpRqFbzphIDpvvusUAuXfWbYPg455M8q0eizKQPCOsw"
        />
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="msapplication-TileColor" content="#1a1a2e" />

        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700;800&display=swap"
          rel="stylesheet"
        />

        {/* 파비콘 */}
        <link rel="icon" href="/imgs/ficon.ico" type="image/x-icon" />

        {/* <link rel="manifest" href="/manifest.json" /> */}

        <link rel="preload" href="/imgs/bg.webp" as="image" />
        <link rel="preload" href="/imgs/main.webp" as="image" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/Shilla_CultureB-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '귀멸의 칼날 호흡 테스트',
              description:
                '귀멸의 칼날 세계관에서 귀살대 대원이 되어 당신에게 어울리는 호흡을 찾아보세요',
              url: 'https://kimetsu-breath-test',
              applicationCategory: 'Entertainment',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW',
              },
              creator: {
                '@type': 'Organization',
                name: 'Kimetsu Breath Test',
              },
            }),
          }}
        />
      </head>

      <body
        className="relative h-svh w-svw 
      flex
      flex-col
      justify-center
      items-center
      bg-[url('/imgs/bg.webp')] bg-repeat bg-auto overscroll-none overflow-hidden"
      >
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
          type="module"
          strategy="lazyOnload"
        />
        <div className={`transition-all duration-700 ease-out`}>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </div>
      </body>
    </html>
  );
}
