locals {
  region            = "us-west-2"
  web_origin_id     = "payment-iframe"
  web_bucket_name   = "payment-iframe.string-api.xyz"
  web_domain        = "payment-iframe.string-api.xyz"
  env               = "prod"
}

locals {
  acl = "private"
  web_policy_config_json = jsonencode({
    "Version" : "2008-10-17",
    "Statement" : [
      {
        "Sid" : "AllowPublicRead",
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "${aws_cloudfront_origin_access_identity.web.iam_arn}"
        },
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::${local.web_bucket_name}/*"
      }
    ]
    }
  )
}

