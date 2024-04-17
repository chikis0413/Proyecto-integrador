import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
                user: "bb7685417a480b",
                pass: "9a33e5d5d1833e"
        }
      });

      const { email, nombre, token } = datos

}

export {
    emailRegistro
}