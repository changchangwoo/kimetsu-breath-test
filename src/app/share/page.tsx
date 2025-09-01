import { breathMetadata } from '@/data/meta_breath.json';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { type?: string };
  searchParams: { type?: string };
}): Promise<Metadata> {
  const type = params?.type || searchParams?.type || 'default';
  const breathData = breathMetadata[type as keyof typeof breathMetadata];

  if (!breathData) {
    return {
      title: '귀멸의 칼날 호흡 성향 테스트 결과',
      description: '당신의 호흡 성향 테스트 결과를 확인해보세요!',
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://kimetsu-breath-test';
  const currentUrl = `${baseUrl}/share/${type}`;

  return {
    title: `${breathData.title} | 귀멸의 칼날 호흡 성향 테스트`,
    description: breathData.description,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: currentUrl,
      title: breathData.title,
      description: breathData.description,
      siteName: '귀멸의 칼날 호흡 성향 테스트',
      images: [
        {
          url: `${baseUrl}${breathData.ogImage}`,
          width: 1200,
          height: 630,
          alt: breathData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: breathData.title,
      description: breathData.description,
      images: [`${baseUrl}${breathData.ogImage}`],
    },
  };
}
