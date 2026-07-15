import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        content: '天网-Ω通信链路未配置OpenAI密钥。请设置环境变量 OPENAI_API_KEY 以启用AI对话功能。当前可使用本地知识库进行交互。',
      });
    }

    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '天网-Ω暂时无法处理您的请求。';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { content: '天网-Ω通信链路暂时中断。请稍后重试。哈夫克与你同频。' },
      { status: 500 }
    );
  }
}