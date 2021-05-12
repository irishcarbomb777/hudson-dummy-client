export const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "hudson-dummy-app-upload",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://kqzjm27sn7.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_kngv1Uwwk",
    APP_CLIENT_ID: "143er74j7g5v0nee5f3qk8939l",
    IDENTITY_POOL_ID: "us-east-1:91fcea35-ad17-44c0-afa4-71de1f8a3e6a",
  },
}