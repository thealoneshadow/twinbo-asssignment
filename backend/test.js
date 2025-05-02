export default function test(req, res) {
    res.status(200).json({ message: "Hello from serverless!" });
  }