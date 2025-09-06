import ClientLoadingWrapper from '@/components/ClientLoadingWrapper';
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

        {/* 파비콘 */}
        <link rel="icon" href="/imgs/ficon.ico" type="image/x-icon" />

        {/* <link rel="manifest" href="/manifest.json" /> */}

        <link rel="preload" href="/imgs/bg.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '귀멸의 칼날 호흡 성향 테스트',
              description:
                '귀멸의 칼날 세계관에서 당신에게 어울리는 호흡의 계승자를 찾아보는 성향 테스트',
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
          strategy="beforeInteractive"
        />

        <ClientLoadingWrapper>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ClientLoadingWrapper>
      </body>
    </html>
  );
}
