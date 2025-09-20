import smtplib
import asyncio
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import os
import logging
from models.contact import ContactSubmission

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.email = os.environ.get('EMAIL_USER')
        self.password = os.environ.get('EMAIL_PASS')
        self.recipient = "dineshedine007@gamil.com"  # User's email
        
    async def send_contact_email(self, submission: ContactSubmission) -> bool:
        """Send contact form email asynchronously"""
        try:
            # Run the blocking email sending in a thread pool
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, self._send_email_sync, submission)
            return result
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return False
    
    def _send_email_sync(self, submission: ContactSubmission) -> bool:
        """Synchronous email sending implementation"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.email
            msg['To'] = self.recipient
            msg['Subject'] = f"Portfolio Contact: Message from {submission.name}"
            
            # Create HTML email body
            html_body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1f2937;">Contact Details:</h3>
                        <p><strong>Name:</strong> {submission.name}</p>
                        <p><strong>Email:</strong> {submission.email}</p>
                        <p><strong>Submitted:</strong> {submission.timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
                    </div>
                    
                    <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
                        <p style="white-space: pre-wrap;">{submission.message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
                        <p>This message was sent from your portfolio website contact form.</p>
                        <p>Reply directly to this email to respond to {submission.name}.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(html_body, 'html'))
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                if self.email and self.password:
                    server.login(self.email, self.password)
                    text = msg.as_string()
                    server.sendmail(self.email, self.recipient, text)
                    logger.info(f"Email sent successfully to {self.recipient}")
                    return True
                else:
                    logger.error("Email credentials not configured")
                    return False
                    
        except Exception as e:
            logger.error(f"Error in email sending: {e}")
            return False
    
    def is_configured(self) -> bool:
        """Check if email service is properly configured"""
        return bool(self.email and self.password)