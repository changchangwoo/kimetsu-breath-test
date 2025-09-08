'use client';

import metaBreathData from '@/data/meta_breath.json';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

const KakaoShareButton = ({
  title = '귀멸의 칼날 호흡 테스트 - 나는 어떤 호흡의 계승자일까?',
  description = '귀멸의 칼날 세계관에서 귀살대 대원이 되어 내 호흡을 찾아보세요! #귀멸의칼날 #전집중호흡 #성향테스트',
  imageUrl = '/imgs/og/OG_02.webp',
  buttonText = '테스트 하기',
  url = '',
  type = '',
}) => {
  const KAKAO_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_API_KAKAO_SHARE;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isInitializedRef = useRef(false);

  const getShareContent = () => {
    if (
      type &&
      metaBreathData.breathMetadata[
        type as keyof typeof metaBreathData.breathMetadata
      ]
    ) {
      const breathData =
        metaBreathData.breathMetadata[
          type as keyof typeof metaBreathData.breathMetadata
        ];
      return {
        title: breathData.title,
        description: breathData.description,
        imageUrl: breathData.ogImage2,
        buttonText: '나도 테스트 하기',
      };
    }
    return { title, description, imageUrl };
  };

  const shareContent = getShareContent();

  const initKakaoShare = () => {
    if (!window.Kakao) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY!);
    }

    const container = document.getElementById('kakaotalk-sharing-btn');
    if (container && window.Kakao.Share && !isInitializedRef.current) {
      container.innerHTML = `
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유 보내기 버튼"
          width="36"
          height="36"
          class="rounded-full"
        />
      `;

      try {
        window.Kakao.Share.createDefaultButton({
          container: '#kakaotalk-sharing-btn',
          objectType: 'feed',
          content: {
            title: shareContent.title,
            description: shareContent.description,
            imageUrl: shareContent.imageUrl,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: buttonText,
              link: {
                webUrl: url,
                mobileWebUrl: url,
              },
            },
          ],
        });
        isInitializedRef.current = true;
      } catch (error) {
        console.error('Kakao Share 버튼 초기화 실패:', error);
      }
    }
  };

  useEffect(() => {
    if (window.Kakao && window.Kakao.Share) {
      isInitializedRef.current = false;
      initKakaoShare();
    }
  }, [
    url,
    type,
    shareContent.title,
    shareContent.description,
    shareContent.imageUrl,
  ]);

  useEffect(() => {
    return () => {
      isInitializedRef.current = false;
    };
  }, []);

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js"
        integrity="sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm"
        crossOrigin="anonymous"
        onLoad={initKakaoShare}
        strategy="afterInteractive"
      />
      <button
        ref={buttonRef}
        id="kakaotalk-sharing-btn"
        className="kakao-share-button"
        type="button"
      >
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유 보내기 버튼"
          width={36}
          height={36}
          className="rounded-full"
        />
      </button>

      <style jsx>{`
        .kakao-share-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .kakao-share-button:hover {
          opacity: 0.8;
        }

        .kakao-share-button img {
          display: block;
        }
      `}</style>
    </>
  );
};

export default KakaoShareButton;
