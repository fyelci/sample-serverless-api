import 'source-map-support/register';
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { logger } from '../util/logger';
import { SignedUploadRequest } from '../types/upload.interface';
import { getS3UploadUrl } from '../service/fileUpload.service';
import { setImagePath } from '../repositories/question.repository';

export const getSignedUrl: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.defaultMeta = { requestId: context.awsRequestId };

  const data: SignedUploadRequest = JSON.parse(event.body);

  // validation
  if (!data.fileType || !data.fileName) {
    return {
      statusCode: 400,
      body: 'You need to provide file name and type',
    };
  }

  const { url, filePath } = await getS3UploadUrl(event.pathParameters.id, data);
  await setImagePath(event.pathParameters.id, filePath);
  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
