"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 py-6 px-6 md:px-10" style={{ scrollSnapAlign: "end" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-lg font-bold mb-2">휴멘드 에이치알</h3>
            <p className="text-white/50 text-sm">인력 매칭 플랫폼</p>
          </div>
          <div className="text-white/50 text-sm leading-relaxed">
            <p>서울특별시 구로구 디지털로34번길 55, 비201-비2(구로동, 코오롱 싸이언스밸리2차)</p>
            <p>Tel. 02-875-8332 | 사업자등록번호 396-87-03869</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[11.5px] md:text-[14.4px]">
            © 2026 휴멘드 에이치알. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-[11.5px] md:text-[14.4px]">
            <a href="#" className="hover:text-white transition-colors">채용공고</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
