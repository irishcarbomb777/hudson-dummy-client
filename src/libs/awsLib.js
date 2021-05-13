import { Storage } from "aws-amplify";

export async function s3Upload(scanId, file) {
  const filename = `${file.name}`;
  // Create S3 folder and upload the logo
  const stored = await Storage.put("zips/"+scanId+'/'+filename, file, {
    contentType: file.type,
  });

  return stored.key;
}