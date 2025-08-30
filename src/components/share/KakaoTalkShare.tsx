'use client';

import Script from 'next/script';

const KakaoShareButton = ({
  title = '딸기 치즈 케익',
  description = '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
  imageUrl = 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.webp',
  webUrl = 'https://developers.kakao.com',
  mobileWebUrl = 'https://developers.kakao.com',
  likeCount = 286,
  commentCount = 45,
  sharedCount = 845,
  buttonText = '웹으로 보기',
  appButtonText = '앱으로 보기',
}) => {
  const KAKAO_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_API_KAKAO_SHARE;

  const initKakaoShare = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY!);
    }

    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl,
            webUrl,
          },
        },
        social: {
          likeCount,
          commentCount,
          sharedCount,
        },
        buttons: [
          {
            title: buttonText,
            link: {
              mobileWebUrl,
              webUrl,
            },
          },
          {
            title: appButtonText,
            link: {
              mobileWebUrl,
              webUrl,
            },
          },
        ],
      });
    }
  };

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
