import ClientLoadingWrapper from '@/components/ClientLoadingWrapper';
import { PageTransitionProvider } from '@/contexts/PageTransitionContext';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | 귀멸의 칼날 호흡 성향 테스트',
    default: '귀멸의 칼날 호흡 성향 테스트 - 나는 어떤 호흡의 계승자일까?',
  },
  description:
    '귀멸의 칼날 세계관에서 귀살대 대원이 되어 당신만의 호흡을 찾아보세 요! 선택지를 통해 화염의 호흡, 물의 호흡, 번개의 호흡 등 당신에게 어울리는 호흡의 계승자를 알아보는 성향 테스트입니다.',
  keywords: [
    '귀멸의 칼날',
    '귀멸의 칼날 테스트',
    '귀멸 성향 테스트',
    '호흡 테스트',
    '성향 테스트',
    '귀살대',
    '화염의 호흡',
    '물의 호흡',
    '번개의 호흡',
    '바위의 호흡',
    '바람의 호흡',
    '벌레의 호흡',
    '소리의 호흡',
    '꽃의 호흡',
    '뱀의 호흡',
    '안개의 호흡',
    '사랑의 호흡',
    '해의 호흡',
    '짐승의 호흡',
    '호흡 계승자',
    'kimetsu',
    'demon slayer',
  ],
  authors: [{ name: 'Kimetsu Breath Test' }],
  creator: 'Kimetsu Breath Test',
  publisher: 'Kimetsu Breath Test',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://your-domain.com',
    title: '귀멸의 칼날 호흡 성향 테스트 - 나는 어떤 호흡의 계승자일까?',
    description:
      '귀멸의 칼날 세계관에서 귀살대 대원이 되어 당신만의 호흡을 찾아보세요! 선택지를 통해 당신에게 어울리는 호흡의 계승자를 알아보는 성향 테스트입니다.',
    siteName: '귀멸의 칼날 호흡 성향 테스트',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: '귀멸의 칼날 호흡 성향 테스트',
      },
      {
        url: '/og-image-square.webp',
        width: 800,
        height: 800,
        alt: '귀멸의 칼날 호흡 성향 테스트',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: '귀멸의 칼날 호흡 성향 테스트 - 나는 어떤 호흡의 계승자일까?',
    description:
      '귀멸의 칼날 세계관에서 당신에게 어울리는 호흡의 계승자를 찾아보세요!',
    images: ['/og-image.webp'],
    creator: '@your_twitter_handle',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://your-domain.com',
    languages: {
      'ko-KR': 'https://your-domain.com',
    },
  },

  applicationName: '귀멸의 칼날 호흡 테스트',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '귀멸의 칼날 호흡 테스트',
  },

  category: 'Entertainment',
  classification: 'Personality Test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="msapplication-TileColor" content="#1a1a2e" />

        {/* 파비콘 */}
        <link
          rel="icon"
          href="/imgs/favicon.ico"
          sizes="256x256"
          type="image/png"
        />

        <link rel="manifest" href="/manifest.json" />

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
              url: 'https://your-domain.com',
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

      <body className="relative min-h-screen max-w-[400px] m-auto">
        <div className="fixed inset-0 bg-[url('../../public/imgs/bg.webp')] bg-repeat bg-auto -z-10" />

        <div className="relative z-10">
          <Script
            src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
            type="module"
            strategy="beforeInteractive"
          />

          <ClientLoadingWrapper>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </ClientLoadingWrapper>
        </div>
      </body>
    </html>
  );
}
