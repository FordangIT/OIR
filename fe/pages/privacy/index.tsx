import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-sm leading-relaxed">
      <h1 className="text-xl font-bold mb-6">개인정보처리방침</h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">1. 수집하는 개인정보 항목</h2>
        <ul className="list-disc list-inside">
          <li>
            웹사이트는 이름, 이메일, 브라우저 정보 등을 수집할 수 있습니다.
          </li>
          <li>
            Google AdSense 등 제3자 광고 서비스는 쿠키를 사용할 수 있습니다.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">2. 개인정보의 수집 및 이용 목적</h2>
        <ul className="list-disc list-inside">
          <li>사용자 맞춤형 콘텐츠 제공</li>
          <li>광고 효율 분석</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">3. 개인정보 보유 및 이용 기간</h2>
        <p>사용자의 요청 또는 서비스 종료 시 즉시 삭제합니다.</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">4. 제3자 정보 제공</h2>
        <ul className="list-disc list-inside">
          <li>
            Google AdSense는 사용자의 브라우저 정보를 광고 타겟팅에 사용할 수
            있습니다.
          </li>
          <li>
            Google의 쿠키 정책 및 비활성화 방법은{" "}
            <a
              href="https://policies.google.com/technologies/ads?hl=ko"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              여기
            </a>
            에서 확인할 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">5. 사용자 권리</h2>
        <p>사용자 본인의 정보 열람, 수정, 삭제를 요청할 수 있습니다.</p>
      </section>
    </div>
  );
}
