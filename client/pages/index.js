import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h3>You are signed in</h3>
  ) : (
    <h3>You are not signed in</h3>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);

  const { data } = await client.get('/api/users/currentus');

  return data;
};

export default LandingPage;
