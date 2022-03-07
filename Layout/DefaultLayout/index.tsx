import React from 'react';
import Head from 'next/head';

interface DefaultLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DefaultLayout = ({
  children,
  title = 'Films vandaag op de Nederlandse Televisie | IsHetAlDonderdag.nl',
}: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>{title}</title>
        <meta
          name="description"
          content="Overzicht van de films van vandaag en morgen op TV"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://tvgidsassets.nl" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
