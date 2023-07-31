---
slug: diy-app-cloud-logging-using-aws-cloudwatch
title: 'DIY app cloud logging using AWS CloudWatch'
authors: 'mifi'
tags: ['aws', 'logging', 'javascript', 'electron', 'nodejs']
---

Need logging in your Electron app to the cloud but don't want to pay for services like Sentry, Papertrail, Bugsnag etc.?

<!--truncate-->

AWS CloudWatch and [Winston](https://github.com/winstonjs/winston) to the rescue!

1. In your Electron `main` app, install and setup [cloudwatch-winston](https://github.com/mifi/cloudwatch-winston).
2. Create a log group in CloudWatch Logs
3. In IAM, create a new user with **only** the following policy: (replace `123456789012` with your AWS account ID and `my-cloudwatch-log-group` with your desired log group name.)
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:123456789012:log-group:my-cloudwatch-log-group",
                "arn:aws:logs:*:123456789012:log-group:my-cloudwatch-log-group:log-stream:*"
            ]
        }
    ]
}
```
4. Copy the Access Key ID and Secret Acces Key and put it in `cloudwatch-winston`, and start logging 🪵🔥

Now if only Winston would work in the browser we could also do this from the web and maybe even from React Native...
