import { breathingColors } from '@/constants/breathingColors';
import { breathMetadata } from '@/data/meta_breath.json';

import { Ttypes } from '@/models/type';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return Object.keys(breathingColors).map(type => ({
    type: type as Ttypes,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { type: Ttypes };
}): Promise<Metadata> {
  const type = params.type;
  const breathData = breathMetadata[type];

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

export default function SharePage() {
  redirect('/');
}
