import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getS3DownloadUrl, getS3UploadUrl } from '../../src/services/fileUpload.service';

jest.mock('@aws-sdk/s3-request-presigner');
const mockedGetSignedUrl = getSignedUrl as jest.Mock;

jest.mock('../../src/util/config', () => ({
  getConfig: (): unknown => ({ s3FilesBucket: 'mockBucket' }),
}));

describe('fileUpload.service', function () {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getS3DownloadUrl', function () {
    it('should get signed download url', async function () {
      const sampleKey = 'dummy/key.txt';
      await getS3DownloadUrl(sampleKey);

      expect(mockedGetSignedUrl).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ input: { Bucket: 'mockBucket', Key: 'dummy/key.txt' } }),
        { expiresIn: 900 }
      );
    });
  });

  describe('getS3UploadUrl', function () {
    it('should get signed upload url', async function () {
      await getS3UploadUrl('abc', { fileName: 'test.txt', fileType: 'text' });

      expect(mockedGetSignedUrl).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          input: { Bucket: 'mockBucket', ContentType: 'text', Key: 'upload/abc/test.txt' },
        }),
        { expiresIn: 900 }
      );
    });
  });
});
