import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);

  const rawdata = await client.get('/api/users/currentus');
  console.log(rawdata);
  const { data } = await client.get('/api/users/currentus');

  console.log(data);

  return data;
};

export default LandingPage;
