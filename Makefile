include .env
.PHONY := default init test build pkg deploy triggers validate stack-events replay cb env env-push
.DEFAULT_GOAL = default

AWS ?= --aws-profile tex
PROJECT ?= $(shell basename $$PWD)
GOTEST ?= AWS_PROFILE=${AWS_PROFILE} go test
ARN_PREFIX_LAMBDA := arn:aws:lambda:us-east-1:140981404942:function:
STACK := EventsActivities
FUNC := events-activities

default:
	@ mmake help

# init project
init: env
	@ go mod vendor

# run tests
test:
	@ SENTRY_DSN=${SENTRY_DSN} SQS_QUEUE=${SQS_QUEUE} ${GOTEST} ./...

# remove build assets
clean:
	@ rm -rf bin/${FUNC}

# build assets
build: clean
	@ GOOS=linux go build -a -v -ldflags '-extldflags "-static"' -o bin/${FUNC}

# package stack
pkg: build
	@ ${AWS} cloudformation package \
	    --template-file src.yml \
	    --output-template-file dist.yml \
	    --s3-bucket gb-cloud

# deploy stack
deploy:
	@ serverless deploy --aws-profile tex

