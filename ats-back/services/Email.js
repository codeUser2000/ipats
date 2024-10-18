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

    static sendCompanyEmail(name,data,creater,subject,company,) {
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
            from: `"ATS SITE" <monitoring@ats.am>`,
            to: 'info@ats.am',
            subject: subject.toString() +' '+ name.toString(),
            html: `<p>Email: ${creater.toString()}</p>
                   <p>Name: ${name}</p>
                   <p>Phone: ${subject}</p>
                   ${company?`<p>Company: ${company}</p>`:''}
                   <p>Message: ${escapedData}</p>`
        })
    }

}

export default Email
