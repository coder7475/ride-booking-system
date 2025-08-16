import AppError from "@/configs/AppError";
import { connectRedis, redisClient } from "@/configs/redis.config";
import { generateOtp, OTP_EXPIRATION } from "@/utils/otpHelpers";
import { sendEmail } from "@/utils/sendEmail";

import { UserModel } from "../user/user.model";

const sendOTP = async (email: string, name: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(401, "You are already verified");
  }
  const otp = generateOtp();

  const redisKey = `otp:${email}`;
  await connectRedis();
  await redisClient.set(redisKey, otp, {
    EX: OTP_EXPIRATION,
  });

  // console.log(otp)
  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    templateName: "otp",
    templateData: {
      name,
      otp,
    },
  });
};

const verifyOTP = async (email: string, otp: string) => {
  // const user = await User.findOne({ email, isVerified: false })
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(401, "You are already verified");
  }

  const redisKey = `otp:${email}`;
  await connectRedis();
  const savedOtp = await redisClient.get(redisKey);

  if (!savedOtp) {
    throw new AppError(401, "Invalid OTP");
  }

  if (savedOtp !== otp) {
    throw new AppError(401, "Invalid OTP");
  }

  await Promise.all([
    UserModel.updateOne(
      { email },
      { isVerified: true },
      { runValidators: true },
    ),
    redisClient.del([redisKey]),
  ]);
};

export const OTPServices = {
  sendOTP,
  verifyOTP,
};
