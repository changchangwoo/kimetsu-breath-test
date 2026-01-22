import { metadata as siteMetdata } from '@/constants/Metadata';
import { PageTransitionProvider } from '@/contexts/PageTransitionContext';
import { Metadata } from 'next';
import Script from 'next/script';
import { nanumMyeongjo } from './fonts';
import './globals.css';

const GA_ID = 'G-ECBP8FNCNB';

export const metadata: Metadata = siteMetdata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={nanumMyeongjo.variable}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

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
        <link rel="icon" href="/imgs/ficon.ico" type="image/x-icon" />
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
      bg-[#0B080D] bg-[url('/imgs/bg.webp')] bg-repeat bg-auto overscroll-none overflow-hidden"
      >
        <div className={`transition-all duration-700 ease-out`}>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </div>
      </body>
    </html>
  );
}
