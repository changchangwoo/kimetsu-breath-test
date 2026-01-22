# 귀멸의 칼날 호흡 테스트

## 개요

**서비스**: https://kimetsu-breath-test.site

**귀멸의 칼날 성향 테스트 서비스**입니다. 12가지 질문을 통해 사용자의 성향을 분석하고, 13가지 호흡 중 가장 어울리는 호흡을 결과로 제공합니다.

Next.js 기반 정적 사이트 환경에서 실제 사용자 트래픽, SNS 공유 기반 유입, SEO 구조를 검증하기 위해 제작된 프로젝트입니다.

테스트 완료자 수 18,000+ (2026-01 기준)

---

## 목적

- 실제 사용자 트래픽을 기반으로 한 유입 구조 검증
- 페이지 별 OG 메타 최적화 및 SNS 공유(카카오톡, X, Threads)를 통한 바이럴 플로우 설계
- SEO를 고려한 Next JS 페이지 설계
- Motion 라이브러리를 활용한 인터랙티브 UX 구현

## 기술 스택

| 분류          | 기술                                   |
| ------------- | -------------------------------------- |
| **Framework** | Next.js 15.4.6 (App Router)            |
| **Library**   | React 19.1.0                           |
| **Language**  | TypeScript 5                           |
| **Style**     | Tailwind CSS 4, Motion (Framer Motion) |
| **ETC**       | Recharts 3.1                           |

---

## 프로젝트 구조

```
src/
├── app/                    # 페이지 및 레이아웃
│   ├── quiz/
│   └── results/[type]/
├── components/             # UI 컴포넌트
│   ├── quiz/
│   ├── results/
│   └── share/
├── animation/              # 애니메이션
├── apis/                   # API 통신
├── contexts/               # 상태 관리
├── data/                   # JSON 데이터
├── models/                 # 타입 정의
└── constants/              # 상수 (테스트 데이터)
```

---

## 저작권

이 프로젝트는 MIT 라이선스를 따릅니다. 또한 모든 설정 및 저작권은 '귀멸의 칼날' 원작자에 귀속되며, 비영리로서 오직 팬 활동 목적으로만 운영됩니다.

---

## 블로그

개발 과정 및 트러블슈팅 기록:
[귀멸의 칼날 호흡 테스트 프로젝트](https://www.changchangwoo.com/post/projects/kimetsu-breath-test)
