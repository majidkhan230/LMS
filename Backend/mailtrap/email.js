import transporter from './mailtrap.js'


export const resetMail = async (email, url) => {
  const info = await transporter.sendMail({
    from: '"abc 👻" <abc@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "reset email", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href=${url}>hello</a>`, // html body
  });
};
