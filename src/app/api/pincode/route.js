export async function GET(req) {
  return new Response(JSON.stringify([44600, 44900, 44800, 44700]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
