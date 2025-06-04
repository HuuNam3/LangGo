import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { getDb } from "@/lib/mongodb";

interface ApiResponse {
  success?: boolean;
  userId?: string;
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    // Lấy dữ liệu từ form
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const avatarUrl = (formData.get("avatarUrl") as string) || "/images/avatar.png";
    const bio = (formData.get("bio") as string) || "Learning languages to explore the world";

    // Kiểm tra các trường bắt buộc
    if (!email || !password || !name || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Kết nối với database
    const db = await getDb();
    const userAccounts = db.collection("user_accounts");
    const userInformation = db.collection("user_information");

    // Kiểm tra email đã tồn tại
    const existingEmail = await userAccounts.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Kiểm tra username đã tồn tại
    const existingUsername = await userAccounts.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    // Tạo thời gian hiện tại
    const now = new Date();

    // Tạo user trong collection user_accounts
    const newUser = {
      email,
      password: hashedPassword,
      name,
      username,
      createdAt: now,
    };

    const userResult = await userAccounts.insertOne(newUser);

    // Tạo thông tin user trong collection user_information
    const newUserInfo = {
      avatarUrl,
      name,
      bio,
      joined: now,
      createdAt: now,
      updatedAt: now,
      user_accounts_id: userResult.insertedId,
    };

    await userInformation.insertOne(newUserInfo);

    return NextResponse.json({
      success: true,
      userId: userResult.insertedId.toString(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}