export async function getUserPoints() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/charge`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  const result = await res.json();
  if (!result.success) {
    throw new Error(`${result.message}`);
  }
  return result;
}

export async function updateUserPoints(point: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ point: point })
  });

  const result = await res.json();
  if (!result.success) {
    throw new Error(`${result.message}`);
  }
  return result;
}
