import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import getPrisma from "../config/database";

const authMiddlware = async (c: Context) => {
  try {
    let token = getCookie(c, "token");

    if (!token) {
      return c.json({
        success: false,
        message: "Please login and try again",
      });
    }

    const prisma = getPrisma(c);
    // verify the token
    try {
      const payload = await verify(token, c.env.JWT_SECRET);

      const userEmail = payload.email as string;

      // const user = await userModel.findOne({ email: userEmail });
      const user = await prisma.users.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        return c.json({
          success: false,
          message: "Please login and try again",
        });
      }

      return c.json({
        success: true,
        message: `Welcome back ${user.name}`,
      });
    } catch (err) {
      return c.json({
        success: false,
      });
    } finally {
      await prisma.$disconnect();
    }
  } catch (err) {
    return c.json({
      success: false,
    });
  }
};

export default authMiddlware;
