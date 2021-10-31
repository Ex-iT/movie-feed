import React from 'react';
import Head from 'next/head';

interface DefaultLayoutProps {
  title?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  title = 'Moviefeed',
}) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>
          Films vandaag op de Nederlandse Televisie | IsHetAlDonderdag.nl
        </title>
        <meta
          name="description"
          content="Overzicht van de films vandaag op TV"
        />
        <meta
          name="keywords"
          content="Films vandaag op TV, Vandaag op televisie, Films vandaag"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
