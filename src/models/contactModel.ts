import mongoose from "mongoose";
import z from "zod";

export const zContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(40, "Name cannot exceed 40 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters")
    .trim(),
});

const contactShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

export const ContactModel = mongoose.model("contact", contactShcema);
