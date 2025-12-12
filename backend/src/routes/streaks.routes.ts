import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, frequency, createdById } = req.body as {
    name?: string;
    frequency?: string;
    createdById?: string;
  };

  if (!name?.trim() || !frequency?.trim() || !createdById?.trim()) {
    return res
      .status(400)
      .json({ error: "name, frequency and createdById are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: createdById }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const streak = await prisma.streak.create({
      data: {
        name: name.trim(),
        frequency: frequency.trim(),
        createdById
      }
    });

    const membership = await prisma.streakMember.create({
      data: {
        userId: createdById,
        streakId: streak.id
      }
    });

    return res.status(201).json({ streak, membership });
  } catch (err) {
    console.error("Error creating streak:", err);
    return res.status(500).json({ error: "Failed to create streak" });
  }
});

export default router;
