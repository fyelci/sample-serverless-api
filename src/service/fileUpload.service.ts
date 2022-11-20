import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { SignedUploadRequest, SignedUploadResponse } from '../types/upload.interface';
import { getConfig } from '../util/config';
import { logger } from '../util/logger';

const expiresIn = 15 * 60;
const { s3FilesBucket } = getConfig();
const client = new S3Client({});

export const getS3UploadUrl = async (
  prefix: string,
  data: SignedUploadRequest
): Promise<SignedUploadResponse> => {
  const Key = `upload/${prefix}/${data.fileName}`;
  const command = new PutObjectCommand({
    Bucket: s3FilesBucket,
    Key,
    ContentType: data.fileType,
  });
  const url = await getSignedUrl(client, command, { expiresIn });
  logger.debug('Generated signed url: ', url);
  return {
    url,
    filePath: Key,
  };
};

export const getS3DownloadUrl = async (Key: string): Promise<string> => {
  const command = new GetObjectCommand({ Bucket: s3FilesBucket, Key });
  const url = await getSignedUrl(client, command, { expiresIn });
  return url;
};
