/* eslint-disable @next/next/no-img-element */
import { getPost } from '@/lib/queries';
import { ImageResponse } from 'next/og';
import { promises as fs } from 'fs';

export const alt = 'The Wall of Digital Wisdom';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  const fontPath = process.cwd() + '/public/Inter_24pt-Regular.ttf';
  const fontData = await fs.readFile(fontPath);

  const imagePath = process.cwd() + '/public/logo.png';
  const imageData = await fs.readFile(imagePath);
  const imageBase64 = `data:image/png;base64,${imageData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div
          style={{
            width: '90%',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <img
              src={imageBase64}
              alt="Logo"
              style={{
                width: '55px',
                height: '70px',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              flexDirection: 'column',
            }}>
            <p
              style={{
                fontSize: 48,
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
              }}>
              {post?.message}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
