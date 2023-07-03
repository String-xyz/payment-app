locals {
  web_origin_id     = "payment-app"
  web_bucket_name   = "payment-app.string-api.xyz"
  web_domain        = "payment-app.string-api.xyz"
  env               = "prod"
}

locals {
  web_policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : aws_cloudfront_origin_access_identity.web.iam_arn
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.web_bucket_name}/*"
      }
    ]
    }
  )
}

