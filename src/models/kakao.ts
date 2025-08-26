// types/kakao.d.ts

interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

interface KakaoShareSocial {
  likeCount: number;
  commentCount: number;
  sharedCount: number;
}

interface KakaoShareButton {
  title: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

interface KakaoShareOptions {
  container: string;
  objectType: "feed" | "list" | "location" | "commerce" | "text";
  content: KakaoShareContent;
  social?: KakaoShareSocial;
  buttons?: KakaoShareButton[];
}

interface KakaoShare {
  createDefaultButton: (options: KakaoShareOptions) => void;
  createCustomButton: (options: KakaoShareOptions) => void;
  createScrapButton: (options: {
    container: string;
    requestUrl: string;
  }) => void;
}

interface KakaoAuth {
  login: (options?: {
    success?: (response: any) => void;
    fail?: (error: any) => void;
    always?: () => void;
    scope?: string;
    throughTalk?: boolean;
    persistAccessToken?: boolean;
    persistRefreshToken?: boolean;
  }) => void;
  logout: (callback?: () => void) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getStatusInfo: (callback: (statusInfo: any) => void) => void;
}

interface KakaoAPI {
  request: (options: {
    url: string;
    data?: any;
    success?: (response: any) => void;
    fail?: (error: any) => void;
    always?: () => void;
  }) => void;
}

interface KakaoStatic {
  init: (key: string) => void;
  isInitialized: () => boolean;
  cleanup: () => void;
  Share: KakaoShare;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

declare global {
  interface Window {
    Kakao: KakaoStatic;
  }
}

export {};
