﻿using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Text;

//using EASendMail;

namespace CandeeCamp.API.Services
{
    public class EmailService
    {
        public EmailService()
        {
            try
            {
                string emailTemplate = null;
                string path = "..\\CandeeCamp.Core.Api\\EmailTemplates\\test.html";
                if (File.Exists(path))
                {
                    using (StreamReader streamReader = new StreamReader(path, Encoding.UTF8))
                    {
                        emailTemplate = streamReader.ReadToEnd();
                    }
                }
                // Credentials
                var credentials = new NetworkCredential("theblackswimmers@gmail.com", "R0salina!");

                // Mail message
                var mail = new MailMessage()
                {
                    From = new MailAddress("theblackswimmers@gmail.com"),
                    Subject = "I guess this works",
                    Body = "yo" //emailTemplate //"Test email body"
                };
                mail.IsBodyHtml = true;

                mail.To.Add(new MailAddress("theblackswimmers@gmail.com "));

                // Smtp client
                var client = new SmtpClient()
                {
                    Port = 587,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Host = "smtp.gmail.com",
                    EnableSsl = true,
                    Credentials = credentials
                };

                // Send it...         
                client.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in sending email: " + ex.Message);
                Console.ReadKey();
                return;
            }

            Console.WriteLine("Email sccessfully sent");
            Console.ReadKey();
        }

        //SmtpMail oMail = new SmtpMail("TryIt");
        //SmtpClient oSmtp = new SmtpClient();

        //// Your gmail email address
        //oMail.From = "theblackswimmers@gmail.com";

        //// Set recipient email address
        //oMail.To = "theblackswimmers@gmail.com";

        //// Set email subject
        //oMail.Subject = "test email from gmail account";

        //// Set email body
        //oMail.TextBody = "this is a test email sent from c# project with gmail.";

        //// Gmail SMTP server address
        //SmtpServer oServer = new SmtpServer("smtp.gmail.com");

        //// If you want to use direct SSL 465 port,
        //// please add this line, otherwise TLS will be used.
        //// oServer.Port = 465;

        //// set 587 TLS port;
        //oServer.Port = 587;

        //// detect SSL/TLS automatically
        //oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;

        //// Gmail user authentication
        //// For example: your email is "gmailid@gmail.com", then the user should be the same
        //oServer.User = "theblackswimmers@gmail.com";
        //oServer.Password = "R0salina!";

        //try
        //{
        //    Console.WriteLine("start to send email over SSL ...");
        //    oSmtp.SendMail(oServer, oMail);
        //    Console.WriteLine("email was sent successfully!");
        //}
        //catch (Exception ep)
        //{
        //    Console.WriteLine("failed to send email with the following error:");
        //    Console.WriteLine(ep.Message);
        //}
    }
}
