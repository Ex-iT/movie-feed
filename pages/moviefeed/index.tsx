const Moviefeed = () => {
  return;
};

export function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  };
}

export default Moviefeed;
