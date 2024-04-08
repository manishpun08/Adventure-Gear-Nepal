import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "52547c367aba25",
    pass: "30ca596d377e93",
  },
});

export const sendEmailOTP = async (firstName, otp, email) => {
  try {
    const info = await transporter.sendMail({
      from: '"Adventure Gear Nepal" <adventuregearnepal@gmail.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Reset Password Otp", // Subject line
      html: `
    <div style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;padding:1rem;">
            <div style="float: right;">
            <img style="height: 100px; width: 60px; background: #000; border-radius: 50%;" src="https://res.cloudinary.com/du65q3gjv/image/upload/v1712456370/qxldprldpfncr3cenyk4.png" />
        </div>

      <h3>Reset Password OTP</h3>
      <p>Dear ${firstName},</p>
      <p>Your OTP for Adventure Gear Nepal is <span style="font-weight:bold;">${otp}</span>.</p>
      <p>If you did not request to change your password, you can ignore this message.</p>
    </div>
    `,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
};
