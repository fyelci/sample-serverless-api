import 'source-map-support/register';
import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { UpdateQuestionRequest } from '../types/question.interface';
import { updateQuestion } from '../repositories/question.repository';
import { logger } from '../util/logger';

export const update: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.defaultMeta = { requestId: context.awsRequestId };

  const data: UpdateQuestionRequest = JSON.parse(event.body);

  // validation
  if (typeof data.text !== 'string' || typeof data.answered !== 'boolean') {
    logger.error('Validation Failed', data);
    return {
      statusCode: 400,
      body: "Couldn't update the question. Please check your input",
    };
  }

  await updateQuestion(event.pathParameters.id, data);
  return {
    statusCode: 200,
    body: 'Updated',
  };
};
