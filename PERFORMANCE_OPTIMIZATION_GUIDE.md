# Kimetsu Breath Test - Performance Optimization Guide

**프로젝트 분석 기반 Vercel Best Practices 적용 가이드**

> 이 문서는 현재 프로젝트의 성능 분석 결과를 바탕으로 Vercel Engineering의 React/Next.js 최적화 가이드라인을 적용하는 방법을 설명합니다.

---

## 목차

---

1. [현재 상태 요약](#1-현재-상태-요약)
2. [Critical - 번들 사이즈 최적화](#2-critical---번들-사이즈-최적화)
3. [Critical - 이미지 최적화](#3-critical---이미지-최적화)
4. [High - 서드파티 스크립트 최적화](#4-high---서드파티-스크립트-최적화)
5. [High - 폰트 로딩 최적화](#5-high---폰트-로딩-최적화)
6. [Medium - 클라이언트 데이터 페칭](#6-medium---클라이언트-데이터-페칭)
7. [Medium - 애니메이션 최적화](#7-medium---애니메이션-최적화)
8. [Medium - 렌더링 성능](#8-medium---렌더링-성능)
9. [체크리스트](#9-체크리스트)

---

## 1. 현재 상태 요약

### 잘 되어 있는 부분

| 항목            | 상태      | 설명                              |
| --------------- | --------- | --------------------------------- |
| 프레임워크 버전 | Excellent | Next.js 15.4.6 + React 19.1.0     |
| 정적 생성 (SSG) | Excellent | 모든 결과 페이지 pre-built        |
| SEO             | Excellent | 메타데이터, OG 태그, JSON-LD 완비 |
| 이미지 포맷     | Good      | WebP 포맷 사용                    |
| 타입 안전성     | Excellent | TypeScript strict mode            |

### 개선이 필요한 부분

| 항목              | 상태      | 영향도   | 설명                                         |
| ----------------- | --------- | -------- | -------------------------------------------- |
| 이미지 최적화     | Poor      | CRITICAL | `unoptimized: true` 설정으로 최적화 비활성화 |
| 번들 사이즈       | Fair      | CRITICAL | recharts, react-icons 전체 로드 (~290KB)     |
| 서드파티 스크립트 | Poor      | HIGH     | dotlottie `beforeInteractive` 로딩           |
| 폰트 로딩         | Fair      | HIGH     | font-display: swap 미적용                    |
| API 캐싱          | Poor      | MEDIUM   | SWR/캐싱 없이 매번 fetch                     |
| 애니메이션        | Excessive | MEDIUM   | 모든 요소에 애니메이션 적용                  |

---

## 2. Critical - 번들 사이즈 최적화

### 2.1 Recharts Dynamic Import

**문제점**: 결과 페이지에서만 사용하는 Recharts가 전체 번들에 포함 (~100KB)

**현재 코드** (`src/components/quiz/weightsGraph.tsx`):

```tsx
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
```

**권장 수정**:

```tsx
import dynamic from 'next/dynamic';

const WeightsGraph = dynamic(
  () => import('./weightsGraph').then(m => m.WeightsGraph),
  {
    ssr: false,
    loading: () => <div className="h-[300px] animate-pulse bg-gray-200" />,
  }
);
```

### 2.2 React Icons 직접 Import

**문제점**: 2개 아이콘만 사용하지만 전체 라이브러리 로드 (~150KB)

**현재 코드**:

```tsx
import { FaGithub } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
```

**권장 수정** (Option 1 - 직접 import):

```tsx
import FaGithub from 'react-icons/fa/FaGithub';
import FaPencil from 'react-icons/fa6/FaPencil';
```

**권장 수정** (Option 2 - next.config.ts 설정):

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // ... 기존 설정
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};
```

**권장 수정** (Option 3 - SVG 직접 사용):

```tsx
// 아이콘 2개뿐이므로 SVG를 직접 사용하는 것이 가장 효율적
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385..." />
  </svg>
);
```

### 2.3 Motion 라이브러리 최적화

**현재 상태**: `motion` (framer-motion) ~40KB gzipped

**권장 수정** - CSS 애니메이션 활용:

```css
/* globals.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
```

간단한 입장 애니메이션은 CSS로 대체하고, 복잡한 인터랙션만 motion 사용

---

## 3. Critical - 이미지 최적화

### 3.1 Next.js Image 최적화 활성화

**현재 설정** (`next.config.ts`):

```typescript
images: {
  unoptimized: true,  // 최적화 비활성화됨
}
```

**권장 수정**:

```typescript
images: {
  // unoptimized 제거 또는 false
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
}
```

### 3.2 Next/Image 컴포넌트 사용

**현재 코드** (`ClientLoadingWrapper.tsx`):

```tsx
// 수동 이미지 프리로딩
const imagePromises = criticalImages.map(src => {
  return new Promise<void>(resolve => {
    const img = new Image();
    img.onload = () => resolve();
    img.src = src;
  });
});
```

**권장 수정**:

```tsx
import Image from 'next/image'

// 메인 이미지에 priority 속성 사용
<Image
  src="/imgs/main.webp"
  alt="Main"
  width={600}
  height={400}
  priority  // LCP 이미지에만 사용
/>

// 퀴즈 이미지는 lazy loading (기본값)
<Image
  src={`/imgs/q${step}.webp`}
  alt={`Question ${step}`}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 3.3 이미지 사이즈 최적화

**현재 상태**: 일부 퀴즈 이미지가 1.2MB로 과도하게 큼

**권장 조치**:

1. 모든 이미지를 1200px 이하로 리사이즈
2. 품질 80-85% 설정
3. AVIF 포맷 추가 지원

```bash
# 이미지 최적화 스크립트 예시
npx sharp-cli resize 1200 --withoutEnlargement --quality 80 public/imgs/*.webp
```

---

## 4. High - 서드파티 스크립트 최적화

### 4.1 Lottie 스크립트 지연 로딩

**현재 코드** (`layout.tsx`):

```tsx
<Script
  src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
  strategy="beforeInteractive" // FCP 차단
/>
```

**권장 수정**:

```tsx
<Script
  src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
  strategy="lazyOnload" // 페이지 로드 후 로딩
/>
```

또는 로딩 상태에서만 필요하므로:

```tsx
// ClientLoadingWrapper.tsx 내부에서 동적 로드
useEffect(() => {
  if (isLoading) {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
    script.async = true;
    document.body.appendChild(script);
  }
}, [isLoading]);
```

### 4.2 Kakao SDK 조건부 로딩

**권장 수정**:

```tsx
// KakaoTalkShare.tsx
const loadKakaoSDK = () => {
  if (window.Kakao) return Promise.resolve();

  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

// 공유 버튼 hover 시 프리로드
<button
  onMouseEnter={loadKakaoSDK}
  onFocus={loadKakaoSDK}
  onClick={handleShare}
>
  카카오톡 공유
</button>;
```

---

## 5. High - 폰트 로딩 최적화

### 5.1 font-display: swap 적용

**현재 코드** (`globals.css`):

```css
@font-face {
  font-family: 'NanumMyeongjo';
  src: url('...');
  /* font-display 없음 */
}
```

**권장 수정**:

```css
@font-face {
  font-family: 'NanumMyeongjo';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/NanumMyeongjo.woff')
    format('woff');
  font-display: swap;
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Shilla_CultureB-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/Shilla_CultureB-Bold.woff2')
    format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Shilla_Gothic-Bold';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2107@1.1/Shilla_Gothic-Bold.woff')
    format('woff');
  font-display: swap;
}
```

### 5.2 핵심 폰트 프리로드

**권장 수정** (`layout.tsx`):

```tsx
<head>
  <link
    rel="preload"
    href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/Shilla_CultureB-Bold.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

---

## 6. Medium - 클라이언트 데이터 페칭

### 6.1 SWR 적용

**현재 코드** (`CountUser.tsx`):

```tsx
useEffect(() => {
  fetchData('/').then(setCountUser);
}, []);
```

**권장 수정**:

```tsx
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function CountUser() {
  const { data: countUser, isLoading } = useSWR(`${API_BASE_URL}/`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1분간 중복 요청 방지
  });

  if (isLoading) return <Skeleton />;
  return <div>{countUser}명 참가</div>;
}
```

### 6.2 localStorage 캐싱 패턴

**현재 코드**:

```tsx
localStorage.getItem('id');
localStorage.getItem('type');
```

**권장 수정**:

```tsx
const VERSION = 'v1';

const storageCache = new Map<string, string | null>();

function getStorage(key: string) {
  const versionedKey = `${key}:${VERSION}`;
  if (!storageCache.has(versionedKey)) {
    try {
      storageCache.set(versionedKey, localStorage.getItem(versionedKey));
    } catch {
      storageCache.set(versionedKey, null);
    }
  }
  return storageCache.get(versionedKey);
}

function setStorage(key: string, value: string) {
  const versionedKey = `${key}:${VERSION}`;
  try {
    localStorage.setItem(versionedKey, value);
    storageCache.set(versionedKey, value);
  } catch {}
}
```

---

## 7. Medium - 애니메이션 최적화

### 7.1 애니메이션 공통화

**현재 상태**: 8개의 애니메이션 컴포넌트가 각각 variants 정의

**권장 수정** - 공통 variants 파일 생성:

```tsx
// animation/variants.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: { opacity: 0, y: -20 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};
```

### 7.2 Reduced Motion 지원

**권장 수정**:

```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// 사용 예시
function BottomUp({ children }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate">
      {children}
    </motion.div>
  );
}
```

### 7.3 SVG 애니메이션 래퍼 사용

**문제점**: SVG 직접 애니메이션은 하드웨어 가속 미지원

**권장 수정**:

```tsx
// 잘못된 방법
<svg className="animate-spin">...</svg>

// 올바른 방법
<div className="animate-spin">
  <svg>...</svg>
</div>
```

---

## 8. Medium - 렌더링 성능

### 8.1 content-visibility 적용

긴 목록이나 결과 페이지 섹션에 적용:

```css
/* globals.css */
.result-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

### 8.2 조건부 렌더링 개선

**현재 코드**:

```tsx
{
  loading && <Skeleton />;
}
```

**권장 수정** (0이나 빈 문자열 가능성이 있을 때):

```tsx
{
  loading ? <Skeleton /> : null;
}
```

### 8.3 정적 JSX 호이스팅

**현재 코드**:

```tsx
function Page() {
  return (
    <div>
      <div className="bg-pattern fixed inset-0" /> {/* 매 렌더마다 재생성 */}
    </div>
  );
}
```

**권장 수정**:

```tsx
const BackgroundPattern = <div className="bg-pattern fixed inset-0" />;

function Page() {
  return <div>{BackgroundPattern}</div>;
}
```

---

## 9. 체크리스트

### Critical (즉시 적용 권장)

- [ ] `next.config.ts`에서 `unoptimized: true` 제거
- [ ] Recharts를 `next/dynamic`으로 동적 import
- [ ] react-icons 직접 import 또는 SVG 대체
- [ ] dotlottie 스크립트 `strategy`를 `lazyOnload`로 변경

### High (1주 이내 적용 권장)

- [ ] Next/Image 컴포넌트로 이미지 최적화
- [ ] 모든 @font-face에 `font-display: swap` 추가
- [ ] 핵심 폰트 preload 추가
- [ ] Kakao SDK 조건부 로딩

### Medium (점진적 개선)

- [ ] SWR 적용으로 API 요청 최적화
- [ ] localStorage 캐싱 및 버저닝
- [ ] 애니메이션 variants 공통화
- [ ] `prefers-reduced-motion` 지원
- [ ] `content-visibility` CSS 적용

---

## 예상 개선 효과

| 메트릭      | 현재 (예상) | 최적화 후 (예상) | 개선율 |
| ----------- | ----------- | ---------------- | ------ |
| 번들 사이즈 | ~290KB      | ~100KB           | -65%   |
| LCP         | ~3.5s       | ~1.5s            | -57%   |
| FCP         | ~2.0s       | ~0.8s            | -60%   |
| TTI         | ~4.0s       | ~2.0s            | -50%   |

> **참고**: 위 수치는 일반적인 최적화 적용 시 예상되는 개선 범위이며, 실제 결과는 네트워크 환경과 디바이스에 따라 다를 수 있습니다.

---

## 참고 자료

- [Vercel React Best Practices](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web Vitals](https://web.dev/vitals/)
- [SWR Documentation](https://swr.vercel.app)

---

_이 문서는 2026년 1월 기준 Vercel Engineering의 React Best Practices v1.0.0을 기반으로 작성되었습니다._
