"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

const SignupSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  data?: any;
};

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Account.",
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "USER",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      }
    });

    const { cookies } = await import("next/headers");
    cookies().set("auth_token", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    cookies().set("auth_role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      message: "Account created successfully.",
      data: user,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
        };
      }
    }
    return {
      message: "Database Error: Failed to Create Account.",
    };
  }
}

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function login(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid Fields.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return {
        message: "Invalid credentials.",
      };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return {
        message: "Invalid credentials.",
      };
    }

    const { cookies } = await import("next/headers");
    cookies().set("auth_token", user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    cookies().set("auth_role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      message: "Login successful.",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: [user.firstName, user.lastName].filter(Boolean).join(" "),
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    return {
      message: "Something went wrong.",
    };
  }
}

export async function logoutAction() {
  const { cookies } = await import("next/headers");
  cookies().delete("auth_token");
  cookies().delete("auth_role");
  return { success: true };
}

export async function getCurrentUser() {
  const { cookies } = await import("next/headers");
  const token = cookies().get("auth_token")?.value;
  
  if (!token) return null;
  
  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(token) },
      select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
      }
    });
    
    if (!user) return null;
    
    return {
        id: user.id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        name: [user.firstName, user.lastName].filter(Boolean).join(" "),
        email: user.email,
        role: user.role,
    };
  } catch (error) {
    return null;
  }
}
