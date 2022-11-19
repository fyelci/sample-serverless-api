import 'source-map-support/register';
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { getQuestion } from '../repositories/question.repository';
import { logger } from '../util/logger';

export const get: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.defaultMeta = { requestId: context.awsRequestId };

  const question = await getQuestion(event.pathParameters.id);
  if (question) {
    return {
      statusCode: 200,
      body: JSON.stringify(question),
    };
  } else {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }
};
