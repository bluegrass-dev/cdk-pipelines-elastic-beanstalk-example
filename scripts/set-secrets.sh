#!/usr/bin/env bash

# aws codebuild \
#     import-source-credentials \
#     --server-type GITHUB \
#     --auth-type PERSONAL_ACCESS_TOKEN \
#     --token "$GITHUB_TOKEN"

aws secretsmanager create-secret \
    --name github-token \
    --secret-string "$GITHUB_TOKEN" \
    --region "$AWS_REGION"