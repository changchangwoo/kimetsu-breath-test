const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function fetchData(url: string, method: string = "GET", body?: any) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}