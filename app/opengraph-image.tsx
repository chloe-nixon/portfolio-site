import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0202',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 40,
            color: '#ff5a0f',
            marginBottom: 28,
          }}
        >
          Chloe Nixon
        </div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            fontSize: 68,
            lineHeight: 1.05,
            color: '#ffffff',
            maxWidth: 920,
          }}
        >
          Australian website developer &amp; designer
        </div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 820,
            marginTop: 28,
          }}
        >
          Webflow, Astro &amp; Next.js builds for design-conscious brands.
        </div>
      </div>
    ),
    size,
  );
}
