import z from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is Required",
    })
    .min(4),
  email: z.string({
    required_error: "Required Email",
  }).email({
    required_error: "Invalid Email",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(12, { message: "Password must be less than 13 characters" }),
});

export const loginSchama = z.object({
  email: z.string().email({
    required_error: "Invalid Email",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(12, { message: "Password must be less than 13 characters" }),
});
