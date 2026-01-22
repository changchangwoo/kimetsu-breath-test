'use client';

import React, { useEffect, useState } from 'react';
import KakaoShareButton from './KakaoTalkShare';

interface ShareButtonProps {
  url?: string;
  text?: string;
  className?: string;
}

export const XShareButton: React.FC<ShareButtonProps> = ({
  url,
  text = '귀멸의 칼날 호흡 성향 테스트',
  className = '',
}) => {
  const handleShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url!
    )}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <button
      onClick={handleShare}
      className={`transition-all hover:scale-105 cursor-pointer bg-black w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-gray-800 ${className}`}
      aria-label="X(트위터)에 공유하기"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export const ThreadsShareButton: React.FC<ShareButtonProps> = ({
  url,
  text = '귀멸의 칼날 호흡 성향 테스트',
  className = '',
}) => {
  const handleShare = () => {
    const shareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(
      text + ' ' + url
    )}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <button
      onClick={handleShare}
      className={`transition-all hover:scale-105 cursor-pointer bg-white w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 ${className}`}
      aria-label="Threads에 공유하기"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.482.875-6.303 2.558-8.39C5.893 1.566 8.626.381 12.164.381h.007c2.682.015 4.98.799 6.83 2.331 1.759 1.457 2.913 3.449 3.431 5.925l-2.898.672c-.381-1.812-1.191-3.244-2.41-4.256-1.284-1.064-2.939-1.611-4.92-1.622h-.003c-2.657.015-4.701.922-6.078 2.697-1.346 1.736-2.034 4.16-2.046 7.212v.052c.01 3.024.698 5.415 2.044 7.108 1.378 1.732 3.425 2.608 6.083 2.605h.007c2.099-.015 3.761-.544 4.941-1.574 1.081-.945 1.683-2.235 1.79-3.834l2.9.15c-.146 2.278-1.025 4.163-2.613 5.552-1.619 1.418-3.839 2.158-6.598 2.199zm4.56-8.659c-.184-1.179-.69-2.087-1.505-2.701-.747-.562-1.727-.875-2.915-.931v-.001c-1.652-.079-2.91.439-3.744 1.539-.704.929-1.071 2.162-1.091 3.666.015 1.468.382 2.668 1.091 3.565.835 1.058 2.076 1.59 3.691 1.58h.019c1.185-.039 2.137-.372 2.831-.991.728-.649 1.123-1.538 1.175-2.645h.003c.002-.037.004-.074.004-.111-.001-.037-.003-.073-.004-.11-.011-.165-.028-.324-.054-.478v-.001c-.132-.773-.441-1.382-.918-1.81-.44-.396-.998-.631-1.659-.697v-.003c-.83-.084-1.489.127-1.961.627-.437.464-.672 1.116-.698 1.939l2.895.108c.006-.166.034-.3.08-.401.048-.104.115-.178.199-.221.131-.066.319-.078.558-.035.295.053.522.181.673.382.145.193.232.455.257.778.001.017.002.034.002.051 0 .054-.003.108-.009.161-.019.154-.059.293-.118.414-.116.237-.308.422-.571.552-.263.13-.584.203-.953.217h-.018c-.688.015-1.234-.173-1.621-.559-.393-.393-.603-.966-.623-1.705v-.003c.017-.922.299-1.658.837-2.189.512-.505 1.218-.778 2.1-.813h.029c.827.038 1.506.263 2.019.671.543.432.899 1.037 1.059 1.797.017.08.031.161.045.244l2.872-.479z" />
      </svg>
    </button>
  );
};

export const NativeShareButton: React.FC<ShareButtonProps> = ({
  url,
  text = '귀멸의 칼날 호흡 성향 테스트',
  className = '',
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const title = '페이지 공유';

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'navigator' in window &&
      'share' in navigator
    ) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
      });
      console.log('공유 성공!');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={handleShare}
      className={`transition-all hover:scale-105 cursor-pointer bg-lightGray/20 w-9 h-9 rounded-full border border-border flex items-center justify-center ${className}`}
      aria-label="브라우저 공유하기"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
          fill="white"
        />
      </svg>
    </button>
  );
};

const ButtonShare: React.FC<{
  url?: string;
  text?: string;
  isResult?: boolean;
}> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  text = '귀멸의 칼날 호흡 성향 테스트',
  isResult = false,
}) => {
  let newUrl = url;
  let kakaoUrl = url;
  let kakaoType: string | null = null;

  if (isResult && typeof window !== 'undefined') {
    let type = localStorage.getItem('type');
    let id = localStorage.getItem('id');

    if (type && id) {
      type = JSON.parse(type);
      id = JSON.parse(id);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      newUrl = `${baseUrl}/results/${type}/index.html?id=${id}`;

      // 카카오톡 공유용 URL과 타입 설정
      kakaoUrl = newUrl;
      kakaoType = type;
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      <KakaoShareButton url={kakaoUrl} type={kakaoType || ''} />
      <XShareButton url={newUrl} text={text} />
      <ThreadsShareButton url={newUrl} text={text} />
      <NativeShareButton url={newUrl} text={text} />
    </div>
  );
};

export default ButtonShare;
