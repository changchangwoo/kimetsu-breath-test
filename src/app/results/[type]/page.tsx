import PageTransition from '@/animation/PageTransition';
import { ResultContent } from '@/components/results/ResultContent';
import { Section01 } from '@/components/results/Section01';
import { Section02 } from '@/components/results/Section02';
import { breathingColors, breathingNames } from '@/constants/breathingColors';
import { breathMetadata } from '@/data/meta_breath.json';
import resultDetail from '@/data/result_script.json';
import { Ttypes } from '@/models/type';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ type: Ttypes }>;
}

export async function generateStaticParams() {
  return Object.keys(breathingColors).map(type => ({
    type: type as Ttypes,
  }));
}

type Props = {
  params: Promise<{
    type: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;

  const typedType = type as Ttypes;
  const breathData = breathMetadata[typedType];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const currentUrl = `${baseUrl}/${type}`;

  return {
    title: `${breathData.title}`,
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
          url: `${baseUrl}/${breathData.ogImage}`,
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
      images: [`${baseUrl}/${breathData.ogImage}`],
    },

    robots: {
      index: false,
      follow: false,
    },
  };
}

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

export default async function ResultPage({ params }: PageProps) {
  const { type } = await params;

  const breathingColor = breathingColors[type];
  const breathingName = breathingNames[type];
  const breathingDetail = resultDetail[type];

  return (
    <main>
      <PageTransition>
        <ResultContent
          firstSection={
            <Section01
              type={type}
              breathingColor={breathingColor}
              breathingName={breathingName}
            />
          }
          secondSection={
            <Section02
              type={type}
              breathingColor={breathingColor}
              breathingDetail={breathingDetail}
              breathingName={breathingName}
            />
          }
        ></ResultContent>
      </PageTransition>
    </main>
  );
}
