import nodemailer from "nodemailer";
import {escape} from 'html-escaper'
const { FRONT_URL } = process.env
const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    secure: true,
    port: 465,
    auth: {
        user: 'monitoring@ats.am',
        pass: 'seqrbojfvhyvzkso'
    }
});

class Email {

    static sendCompanyEmail(name,data,creater,subject,company,position) {
        const codePatterns = [
            /<script[\s\S]*?>[\s\S]*?<\/script>/i,
            /<style[\s\S]*?>[\s\S]*?<\/style>/i,
            /<[^>]+>[\s\S]*?<\/[^>]+>/i
        ];
        if(codePatterns.some(pattern => pattern.test(data))){
            return Promise.resolve();
        }
        const escapedData = escape(data.toString());
        return transporter.sendMail({
            from: `"IP-ATS" <monitoring@ats.am>`,
            to: 'info@ats.am',
            subject: 'IP-ATS registration',
            html: `<p>Email: ${creater.toString()}</p>
                   <p>Name: ${name}</p>
                   ${subject? `<p>Phone: ${subject}</p>`:''}
                   <p>Position: ${position}</p>
                   ${company?`<p>Company: ${company}</p>`:''}
                   ${escapedData?`<p>Message: ${escapedData}</p>`:''}`
        })
    }
    static sendResponseEmail(email,name) {
        return transporter.sendMail({
            from: `"IP-ATS" <monitoring@ats.am>`,
            to: email,
            subject: 'Registration',
            html: `<p> Dear ${name}.</p> <p>Thank you for choosing us. We resived your submition and our specialists will contact you soon</p>`
        })
    }

}

export default Email
