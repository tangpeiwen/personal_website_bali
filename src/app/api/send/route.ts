import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: '所有字段均为必填项' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.ADMIN_EMAIL!],
      subject: `新留言来自 ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px;">
          <h2>你有一条新留言</h2>
          <p><strong>姓名：</strong>${name}</p>
          <p><strong>邮箱：</strong>${email}</p>
          <p><strong>内容：</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
