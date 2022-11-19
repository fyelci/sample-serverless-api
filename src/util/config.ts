export interface Config {
  awsRegion: string;
  questionsTable: string;
}

export const config: Config = Object.freeze({
  awsRegion: process.env.AWS_REGION || 'eu-west-2',
  questionsTable: process.env.DYNAMODB_QUESTIONS_TABLE as string,
});

export const getConfig = (): Config => config;
