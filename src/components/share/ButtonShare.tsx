'use client';

import React, { useEffect, useState } from 'react';
import { BsThreads } from 'react-icons/bs';
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
      <BsThreads />
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
