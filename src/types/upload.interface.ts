export interface SignedUploadRequest {
  fileName: string;
  fileType: string;
}

export interface SignedUploadResponse {
  url: string;
  filePath: string;
}
