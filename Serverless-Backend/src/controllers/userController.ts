import { Context } from "hono";
import getPrisma from "../config/database";
import { sign } from "hono/jwt";
import { deleteCookie, setCookie } from "hono/cookie";
import { hashPassword, verifyPassword } from "../utils/passwordHashing";

export const login = async (c: Context) => {
  const prisma = getPrisma(c);

  try {
    const { email, password }: { email: string; password: string } =
      await c.req.json();

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({
        success: false,
        message: "Please create an account before logging in",
      });
    }

    const storedPassword = user.password;

    if (await verifyPassword(storedPassword, password)) {
      const JWT_SECRET = c.env.JWT_SECRET;

      const payload = {
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };

      let token = await sign(payload, JWT_SECRET);

      setCookie(c, "token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      return c.json({
        success: true,
        message: "You're logged in successfully",
      });
    } else {
      return c.json({
        success: false,
        message: "Username or password don't match",
      });
    }
  } catch (err) {
    return c.json({
      success: false,
      message:
        "We are facing some issues. Please try again later. Sorry for inconvenience!!!",
    });
  } finally {
    await prisma.$disconnect();
  }
};

type ReqBody = {
  name: string;
  email: string;
  password: string;
};

export const signup = async (c: Context) => {
  const prisma = getPrisma(c);

  try {
    const { name, email, password }: ReqBody = await c.req.json();

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      return c.json({
        success: false,
        message:
          "Couldn't create entry in database due to error in password hashing",
      });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return c.json({
        success: false,
        message: "Email is already registered",
      });
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (user) {
      return c.json({
        success: true,
        message: "Your account has been created successfully",
      });
    }
  } catch (err) {
    return c.json({
      success: false,
      message:
        "We are facing some issues. Please try again later. Sorry for inconvenience!!!",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const logout = (c: Context) => {
  deleteCookie(c, "token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return c.json({ success: "true" });
};
