# Shell Config

Mora Go Shell이 사용할 MFE와 API 버전을 환경별로 관리하는 런타임 설정 저장소입니다.

## 구현 내용

- 개발·운영 환경별 MFE 및 API 버전 선택
- Shell이 조회하는 `config.json` 생성
- 최신 설정과 패키지 버전별 고정 설정 동시 배포
- 설정 파일의 필수 항목과 URL 형식 검사
- Vercel 정적 배포를 위한 공개 파일 생성

## 주요 파일

- `config.source.json`: 런타임 설정 원본
- `importmap/dev.json`: 개발 환경 버전 선택
- `importmap/prod.json`: 운영 환경 버전 선택
- `public/`: 빌드 결과

## 검증 및 빌드

```bash
npm install
npm run check
npm run build
```
