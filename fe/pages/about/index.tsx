import React from "react";
import Head from "next/head";

export default function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-sm leading-relaxed">
      <Head>
        <title>사이트 소개 | OIR</title>
      </Head>

      <h1 className="text-xl font-bold mb-6">OIR(Our Internet Real) 소개</h1>

      <section className="mb-6">
        <p>
          <strong>OIR</strong>은 중·고등학생들을 위한 온라인 커뮤니티
          플랫폼입니다. 학생들이 일상 속에서 자주 접하는{" "}
          <strong>학교 시간표, 급식 정보, 쪽지 기능</strong> 등을 통합 제공하여,
          보다 편리한 학습 환경과 소통의 장을 마련하고자 합니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">서비스 목적</h2>
        <ul className="list-disc list-inside">
          <li>학생 개개인에게 맞춤형 학교 생활 정보를 제공</li>
          <li>시간표와 급식을 간편하게 확인할 수 있는 구조 제공</li>
          <li>익명 쪽지 기능을 통해 학교 내 소통 강화</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">운영 배경</h2>
        <p>
          기존의 학교 관련 정보는 각기 흩어져 있고 접근이 불편했습니다. OIR은
          이러한 문제를 해결하고자,{" "}
          <strong>학교 중심의 정보와 소통 기능</strong>을 하나의 웹 서비스에
          모았습니다. 학생의 관점에서, 실질적인 도움을 줄 수 있는 서비스가
          되기를 목표로 합니다.
        </p>
      </section>

      <section>
        <h2 className="font-semibold mb-2">앞으로의 계획</h2>
        <ul className="list-disc list-inside">
          <li>학교별 맞춤 콘텐츠 강화</li>
          <li>학생들 간의 소통 기능 확대</li>
          <li>앱 서비스 개발 및 확장</li>
        </ul>
        <p className="mt-2">
          앞으로도 사용자 여러분의 의견을 바탕으로 더 나은 서비스를 만들어
          나가겠습니다.
        </p>
      </section>
    </div>
  );
}
