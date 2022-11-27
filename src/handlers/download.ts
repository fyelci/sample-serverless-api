import 'source-map-support/register';
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { logger } from '../util/logger';
import { getS3DownloadUrl } from '../services/fileUpload.service';
import { getQuestion } from '../repositories/question.repository';

export const getSignedUrl: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.defaultMeta = { requestId: context.awsRequestId };

  const question = await getQuestion(event.pathParameters.id);
  if (question.image) {
    const url = await getS3DownloadUrl(question.image);

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } else {
    return {
      statusCode: 400,
      body: 'Could not find image',
    };
  }
};
