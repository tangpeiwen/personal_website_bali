import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { date, timeSlot, wechat, email, notes } = await request.json();

    if (!date || !timeSlot) {
      return Response.json({ error: '缺少必要字段' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.ADMIN_EMAIL!],
      subject: `新预约通知：${date} ${timeSlot}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; padding: 24px; border: 4px solid #000;">
          <h2 style="margin-top: 0;">你有一条新的预约请求</h2>
          <hr style="border: 2px solid #000;" />
          <p><strong>预约日期：</strong>${date}</p>
          <p><strong>时间段：</strong>${timeSlot}</p>
          ${wechat ? `<p><strong>微信号：</strong>${wechat}</p>` : ''}
          ${email ? `<p><strong>邮箱：</strong>${email}</p>` : ''}
          ${notes ? `<p><strong>备注：</strong></p><p style="white-space: pre-wrap;">${notes}</p>` : ''}
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch {
    return Response.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
