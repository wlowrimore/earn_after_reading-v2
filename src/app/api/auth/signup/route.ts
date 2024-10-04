import { NextResponse } from "next/server";
// import { hash } from 'bcrypt';
// import { db } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // const hashedPassword = await hash(password, 10);
        // const user = await db.user.create({
        //     data: {
        //         email,
        //         password: hashedPassword
        //     }
        // })

        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'An error occurred while creating the user' },
            { status: 400 }
        )
    }
}