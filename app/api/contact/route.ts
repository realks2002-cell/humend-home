import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_TO = "leehacksoo@gmail.com";
const CONTACT_CC = "realks2002@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  { key: "company", label: "회사명", max: 100 },
  { key: "name", label: "담당자명", max: 50 },
  { key: "phone", label: "연락처", max: 30 },
  { key: "email", label: "이메일", max: 100 },
  { key: "content", label: "문의내용", max: 3000 },
] as const;

type ContactInput = Record<(typeof FIELDS)[number]["key"], string>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseInput(body: unknown): ContactInput | string {
  if (typeof body !== "object" || body === null) return "잘못된 요청입니다.";
  const source = body as Record<string, unknown>;
  const input = {} as ContactInput;
  for (const { key, label, max } of FIELDS) {
    const value = typeof source[key] === "string" ? (source[key] as string).trim() : "";
    if (!value) return `${label}을(를) 입력해주세요.`;
    if (value.length > max) return `${label}은(는) ${max}자 이내로 입력해주세요.`;
    input[key] = value;
  }
  if (!EMAIL_PATTERN.test(input.email)) return "이메일 형식이 올바르지 않습니다.";
  return input;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = parseInput(body);
  if (typeof input === "string") {
    return NextResponse.json({ error: input }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY 또는 RESEND_FROM_EMAIL 환경변수가 없습니다.");
    return NextResponse.json({ error: "메일 발송 설정 오류입니다." }, { status: 500 });
  }

  const rows = FIELDS.map(
    ({ key, label }) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:13px;color:#71717a;width:90px;vertical-align:top">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:14px;color:#18181b;white-space:pre-wrap">${escapeHtml(input[key])}</td>
      </tr>`
  ).join("");

  const { data, error } = await new Resend(apiKey).emails.send({
    from,
    to: CONTACT_TO,
    cc: CONTACT_CC,
    replyTo: input.email,
    subject: `[Humend HR] 홈페이지 문의 - ${input.company.replace(/[\r\n]+/g, " ")}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden">
          <tr>
            <td style="background-color:#16a34a;padding:24px 32px">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700">홈페이지 문의</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px">
              <table width="100%" cellpadding="0" cellspacing="0">${rows}
              </table>
              <p style="margin:24px 0 0;font-size:13px;color:#71717a">이 메일에 회신하면 문의자(${escapeHtml(input.email)})에게 바로 답장됩니다.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim(),
  });

  if (error) {
    console.error("[contact] 메일 발송 실패:", error);
    return NextResponse.json({ error: "메일 발송에 실패했습니다." }, { status: 502 });
  }

  return NextResponse.json({ id: data?.id });
}
