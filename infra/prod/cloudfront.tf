resource "aws_cloudfront_origin_access_identity" "web" {
  comment = "${local.env} string payment-app web origin"
}

resource "aws_cloudfront_distribution" "web_app" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [local.web_domain]
  origin {
    domain_name = aws_s3_bucket.web_app.bucket_regional_domain_name
    origin_id   = local.web_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.web.cloudfront_access_identity_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    target_origin_id = local.web_origin_id
    compress         = true
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = 0
  }

  viewer_certificate {
    ssl_support_method             = "sni-only"
    acm_certificate_arn            = module.web_app.arn
    minimum_protocol_version       = "TLSv1.1_2016"
    cloudfront_default_certificate = false
  }
}
