module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          s3Options: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET,
            region: process.env.AWS_REGION,
            params: {
              ACL: process.env.AWS_ACL || 'public-read',
              signedUrlExpires: process.env.AWS_SIGNED_URL_EXPIRES || 15 * 60,
              Bucket: process.env.AWS_BUCKET, // Use process.env to retrieve the S3 bucket name
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    }
    // ...
  });
  