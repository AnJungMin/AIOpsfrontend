export default function About() {
    return (
      <section className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-2">ScalpCare 소개</h2>
        <p className="text-gray-600 dark:text-gray-300">
          ScalpCare는 인공지능 기반의 두피 질환 진단 웹앱입니다.  
          사용자가 업로드한 사진을 통해 6가지 주요 두피 질환 여부를 분석하고,  
          제품 추천 및 병원 안내를 제공하여 더 나은 두피 건강을 돕습니다.
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>AI 기반 자동 진단</li>
          <li>맞춤 제품 추천</li>
          <li>병원 안내 기능</li>
        </ul>
      </section>
    );
  }
  