import { NextFunction, Request, Response } from "express";
import { ContactModel, zContactShcema } from "../models/contactModel";
import { sendMail } from "../utils/sentMail";

export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validation = zContactShcema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "validation error",
        error: validation.error.format(),
      });
    }

    const detail = validation.data;
    const data = await ContactModel.create(detail);

    await sendMail(
      process.env.EMAIL_USER as string,
      "📩 New Contact Message - Portfolio",
      `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px">
      
      <h2 style="color:#333;">New Contact Message</h2>
      <hr />

      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>

      <div style="margin-top:15px">
        <p><strong>Message:</strong></p>
        <p style="background:#f1f1f1; padding:10px; border-radius:5px">
          ${data.message}
        </p>
      </div>

      <hr />
      <p style="font-size:12px; color:#777">
        This message was sent from your portfolio contact form.
      </p>
    </div>
  </div>
  `,
    );

    await sendMail(
      data.email,
      "Thanks for contacting me 👋",
      `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:20px; border-radius:8px">

      <h2 style="color:#333;">Hello ${data.name},</h2>

      <p>
        Thank you for reaching out to me through my portfolio website.
        I’ve received your message and I appreciate your interest.
      </p>

      <p>
        I will review your message and get back to you as soon as possible.
      </p>

      <p style="margin-top:20px">
        Best regards,<br />
        <strong>Ahmed Bahgat</strong><br />
        Backend Developer<br />
      </p>

      <hr />
      <p style="font-size:12px; color:red">
        Please do not reply to this email. This is an automated message.
      </p>

    </div>
  </div>
  `,
    );

    res.status(201).json({
      message: "message send successfully",
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};
