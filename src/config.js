const dev = {
  s3: {
    REGION: "eu-west-1",
    BUCKET: "revidoo-dev-attachmentsbucket-bos8eoxd2stq"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://09t6jgqy83.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_KjpGxebAO",
    APP_CLIENT_ID: "3v0efbrn7531rckvp1vajc48qv",
    IDENTITY_POOL_ID: "eu-west-1:1588fe75-85c3-40ba-a161-0d35f05a8e3e"
  }
};

const prod = {
  s3: {
    REGION: "eu-west-1",
    BUCKET: "revidoo-dev-attachmentsbucket-bos8eoxd2stq"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://09t6jgqy83.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_KjpGxebAO",
    APP_CLIENT_ID: "3v0efbrn7531rckvp1vajc48qv",
    IDENTITY_POOL_ID: "eu-west-1:1588fe75-85c3-40ba-a161-0d35f05a8e3e"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
