export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  };
}
