import ResponseType from './type';

export const defaultResponse = (
  code: number,
  response: 'success' | 'fail',
  message: string,
  result?: any
): ResponseType => {
  return {
    status: {
      code,
      response,
      message,
    },
    result
  }
};