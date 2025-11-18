// api/leads.js

export default function handler(req, res) {
  const API_KEY = process.env.MOCK_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method Not Allowed"
    });
  }

  const incomingKey = req.headers["x-api-key"];

  if (!incomingKey || incomingKey !== API_KEY) {
    return res.status(401).json({
      status: "error",
      message: "Invalid authentication token"
    });
  }

  // Safety: ensure body is array
  if (!Array.isArray(req.body)) {
    return res.status(400).json({
      status: "error",
      message: "Request body must be an array"
    });
  }

  const result = req.body.map(() => ({
    status: "success",
    message: "Lead received successfully",
    externalId: crypto.randomUUID()
  }));

  return res.status(200).json(result);
}
