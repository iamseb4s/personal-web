import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const healthCheckHeader = request.headers.get('x-health-check');

  if (healthCheckHeader === 'true') {
    const timestamp = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima',
      hour12: false,
    });
    return Response.json({ status: 'ok', timestamp }, { status: 200 });
  } else {
    // Return 404 Not Found to obscure the endpoint from general scanners
    return new Response(null, { status: 404 });
  }
}
