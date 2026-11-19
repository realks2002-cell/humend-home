"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    content: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Humend HR] 문의 - ${formData.company}`);
    const body = encodeURIComponent(
      `회사명: ${formData.company}\n담당자명: ${formData.name}\n연락처: ${formData.phone}\n이메일: ${formData.email}\n\n문의내용:\n${formData.content}`
    );
    window.location.href = `mailto:leehacksoo@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormData({ company: "", name: "", phone: "", email: "", content: "" });
  };

  return (
    <section id="contact" className="section-snap relative w-full bg-gray-950 flex items-start md:items-center justify-center overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 py-10 md:py-20" style={{ marginTop: "-30px" }}>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white text-[26px] md:text-5xl lg:text-[50px] font-bold mb-4 mt-0 md:mt-[40px]">문의하기</h2>
          <p className="text-white/50 text-xs md:text-xl">
            Humend HR는 인력을 보내는 회사가 아니라 현장을 안정시키는 파트너입니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="ml-[60px] md:ml-[30px] flex flex-col justify-between h-full scale-[1.21] origin-top-left mt-[50px]"
          >
            <div className="space-y-4 md:space-y-8">
              <div className="flex items-start gap-3 md:gap-5">
                <div className="w-9 h-9 md:w-14 md:h-14 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Phone size={26} className="text-primary hidden md:block" />
                  <Phone size={16} className="text-primary md:hidden" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm md:text-xl">전화 문의</p>
                  <p className="text-white/80 text-base md:text-2xl font-bold mt-1">02-875-8332</p>
                  <p className="text-white/40 text-xs md:text-base mt-1">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-5">
                <div className="w-9 h-9 md:w-14 md:h-14 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Mail size={26} className="text-primary hidden md:block" />
                  <Mail size={16} className="text-primary md:hidden" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm md:text-xl">이메일 문의</p>
                  <p className="text-white/80 text-base md:text-xl mt-1">humend@humendhr.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-5">
                <div className="w-9 h-9 md:w-14 md:h-14 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <MapPin size={26} className="text-primary hidden md:block" />
                  <MapPin size={16} className="text-primary md:hidden" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm md:text-xl">오시는 길</p>
                  <p className="text-white/80 text-base md:text-xl mt-1">서울특별시 구로구 디지털로34번길 55</p>
                  <p className="text-white/50 text-xs md:text-lg">비201-비2(구로동, 코오롱 싸이언스밸리2차)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-5">
                <div className="w-9 h-9 md:w-14 md:h-14 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={26} className="text-primary hidden md:block" />
                  <MessageCircle size={16} className="text-primary md:hidden" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm md:text-xl">카카오톡 문의</p>
                  <a href="https://pf.kakao.com/_sPCKb/chat" target="_blank" rel="noopener noreferrer" className="text-primary text-base md:text-xl font-medium mt-1 inline-block hover:underline">
                    카카오톡으로 문의하기 →
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right - Form (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            {submitted ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mt-[30px] text-center">
                <p className="text-white text-2xl font-bold mb-4">문의가 접수되었습니다</p>
                <p className="text-white/60">빠른 시일 내에 연락드리겠습니다.</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 mt-[30px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/70 text-base font-medium mb-2 block">회사명 *</label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="회사명을 입력해주세요"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-3 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-base font-medium mb-2 block">담당자명 *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="담당자명을 입력해주세요"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-3 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/70 text-base font-medium mb-2 block">연락처 *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-3 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-base font-medium mb-2 block">이메일 *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@company.com"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-3 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 text-base font-medium mb-2 block">문의내용 *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="필요한 인력 규모, 업종, 기간 등을 상세히 적어주시면 빠른 상담이 가능합니다."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-3 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-colors text-lg"
              >
                문의 보내기
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
