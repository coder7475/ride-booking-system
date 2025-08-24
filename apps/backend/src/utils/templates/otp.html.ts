export const otpHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification Code</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
        }
        .otp-container {
            text-align: center;
            margin: 30px 0;
            padding: 25px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border: 2px dashed #e9ecef;
        }
        .otp-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            font-family: 'Courier New', monospace;
            letter-spacing: 4px;
            margin: 10px 0;
        }
        .validity-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .validity-info .icon {
            font-size: 18px;
            margin-right: 5px;
        }
        .validity-text {
            color: #856404;
            font-weight: 500;
        }
        .security-notice {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #721c24;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer-text {
            font-size: 12px;
            color: #666;
            margin: 0;
        }
        .company-name {
            font-weight: bold;
            color: #333;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }
            .content {
                padding: 20px;
            }
            .otp-code {
                font-size: 28px;
                letter-spacing: 2px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔐 Verification Code</h1>
        </div>
        <div class="content">
            <div class="greeting">
                Hello <%= name %>,
            </div>
            <div class="message">
                We received a request to verify your account. Please use the One-Time Password (OTP) below to complete your verification:
            </div>
            <div class="otp-container">
                <div class="otp-label">Your OTP Code</div>
                <div class="otp-code"><%= otp %></div>
            </div>
            <div class="validity-info">
                <span class="icon">⏰</span>
                <span class="validity-text">This code expires in <strong>5 minutes</strong></span>
            </div>
            <div class="security-notice">
                <strong>Security Notice:</strong> Never share this code with anyone. Our team will never ask for your OTP code via phone, email, or any other communication method.
            </div>
            <div class="message">
                If you didn't request this verification code, please ignore this email or contact our support team if you have concerns about your account security.
            </div>
        </div>
        <div class="footer">
            <p class="footer-text">
                This email was sent by <span class="company-name">Test School</span><br>
                If you have any questions, please contact us at support@testschool.com
            </p>
        </div>
    </div>
</body>
</html>`;

export const resetPasswordHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
        }
        .reset-container {
            text-align: center;
            margin: 30px 0;
        }
        .reset-button {
            background-color: #667eea;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            transition: background 0.3s;
        }
        .reset-button:hover {
            background-color: #5563d6;
        }
        .validity-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .validity-info .icon {
            font-size: 18px;
            margin-right: 5px;
        }
        .validity-text {
            color: #856404;
            font-weight: 500;
        }
        .security-notice {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #721c24;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer-text {
            font-size: 12px;
            color: #666;
            margin: 0;
        }
        .company-name {
            font-weight: bold;
            color: #333;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔑 Reset Your Password</h1>
        </div>
        <div class="content">
            <div class="greeting">
                Hello <%= name %>,
            </div>
            <div class="message">
                We received a request to reset your password. Click the button below to set a new password:
            </div>
            <div class="reset-container">
                <a href="<%= resetLink %>" class="reset-button">Reset Password</a>
            </div>
            <div class="validity-info">
                <span class="icon">⏰</span>
                <span class="validity-text">This link expires in <strong>15 minutes</strong></span>
            </div>
            <div class="security-notice">
                <strong>Security Notice:</strong> Never share this link with anyone. Our team will never ask for your password via email or any other method.
            </div>
            <div class="message">
                If you didn't request a password reset, please ignore this email or contact our support team.
            </div>
        </div>
        <div class="footer">
            <p class="footer-text">
                This email was sent by <span class="company-name">Your Company</span><br>
                For support, contact us at support@yourcompany.com
            </p>
        </div>
    </div>
</body>
</html>`;
