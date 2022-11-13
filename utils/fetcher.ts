async function fetcher<T>(url: string): Promise<T>{
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      "An error occurred while fetching the data."
    );
    // Attach extra info to the error object.
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default fetcher;
