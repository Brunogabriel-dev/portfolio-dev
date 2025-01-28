import { NextResponse } from "next/server";
import { Resend } from "resend";

// Crie a instância do Resend com a chave da variável de ambiente
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
  // Extraia os dados do corpo da requisição
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);

  try {
    // Enviar email usando o Resend
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      `, // Usando HTML ao invés de JSX
    });

    // Retorne a resposta com os dados do envio
    return NextResponse.json(data);
  } catch (error) {
    // Caso ocorra algum erro, retorne um erro na resposta
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
