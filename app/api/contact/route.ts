import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const { name, email, company, phone, interest, message } = await req.json()

        if (!name || !email) {
            return NextResponse.json(
                { message: 'Name und E-Mail sind erforderlich.' },
                { status: 400 }
            )
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587,
            secure: process.env.MAIL_PORT === '465',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        })

        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: process.env.MAIL_FROM_ADDRESS,
            replyTo: email,
            subject: `Neue Anfrage von ${name} - Chop Chop Landingpage`,
            text: `
Name: ${name}
E-Mail: ${email}
Betrieb: ${company || '-'}
Telefon: ${phone || '-'}
Interesse: ${interest || '-'}

Nachricht:
${message}
      `,
            html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Betrieb:</strong> ${company || '-'}</p>
        <p><strong>Telefon:</strong> ${phone || '-'}</p>
        <p><strong>Interesse:</strong> ${interest || '-'}</p>
        <br />
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { message: 'Nachricht erfolgreich gesendet.' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail:', error)
        return NextResponse.json(
            { message: 'Es ist ein Fehler aufgetreten.' },
            { status: 500 }
        )
    }
}
