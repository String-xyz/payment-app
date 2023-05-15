resource "aws_s3_bucket" "web_app" {
  bucket = local.web_bucket_name
}

resource "aws_s3_bucket_public_access_block" "web_app" {
  bucket                  = aws_s3_bucket.web_app.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_website_configuration" "app_s3_config" {
  bucket = aws_s3_bucket.web_app.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "app_s3_policy" {
  bucket = aws_s3_bucket.web_app.id
  policy = local.web_policy_config_json
}
