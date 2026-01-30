import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return result;
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
};
