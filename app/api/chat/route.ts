import { REGIONS } from '@/lib/types';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, settings } = body;

    if (!messages || !settings) {
      return new Response(JSON.stringify({ error: 'Missing messages or settings' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let apiUrl: string;
    let apiKey: string;

    if (settings.provider === 'qoder') {
      if (!settings.qoderEndpoint || !settings.qoderApiKey) {
        return new Response(JSON.stringify({ error: 'Qoder Agent endpoint and API key are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      apiUrl = settings.qoderEndpoint.replace(/\/$/, '') + '/chat/completions';
      apiKey = settings.qoderApiKey;
    } else {
      if (!settings.qwenApiKey) {
        return new Response(JSON.stringify({ error: 'Qwen API key is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const region = REGIONS.find(r => r.value === settings.region);
      const baseUrl = region?.baseUrl || REGIONS[0].baseUrl;
      apiUrl = `${baseUrl}/chat/completions`;
      apiKey = settings.qwenApiKey;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model || 'qwen-plus',
        messages,
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `API Error: ${response.status} - ${errorText}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the response back
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Server error: ${(error as Error).message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
