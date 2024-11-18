/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // SWC를 사용한 압축 (Next.js의 기본 빌드 최적화 도구)
  compress: true, // HTTP 응답 압축 활성화 (서버에 성능 향상)
  productionBrowserSourceMaps: false, // 프로덕션 브라우저 소스맵 비활성화 (메모리 사용량 감소)
  experimental: {
    workerThreads: true, // 빌드 중 워커 스레드 사용 (성능 향상)
    cpus: 2 // 빌드에 사용할 CPU 코어 수 설정
  }
};

export default nextConfig;
