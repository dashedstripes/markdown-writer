import { getSession } from 'next-auth/client'
import { google } from "googleapis";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ auth, version: "v3" });

  const response = await drive.files.update({
    fileId: req.query?.fileId,
    media: {
      mimeType: 'text/plain',
      body: req.body
    }
  });

  console.log(response.data?.id);

  res.status(200).json({ fileId: response.data?.id });
  
};