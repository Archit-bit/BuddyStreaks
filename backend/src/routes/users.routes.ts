import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body as { name?: string };

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const user = await prisma.user.create({
      data: { name: name.trim() }
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
