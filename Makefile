export
AWS_PROFILE=${env}-string
prod_S3_BUCKET=payment-app.string-api.xyz
dev_DISTRIBUTION_ID=EREMI7QXDZLML
prod_DISTRIBUTION_ID=E30Z8G0TIO2747
test-envvars:
	@[ "${env}" ] || ( echo "env var is not set"; exit 1 )

build: test-envvars
	yarn build

push: test-envvars
	aws s3 cp --recursive dist/ s3://${${env}_S3_BUCKET} && aws cloudfront create-invalidation \
	--distribution-id ${${env}_DISTRIBUTION_ID} \
	--paths "/*"

all: build push
