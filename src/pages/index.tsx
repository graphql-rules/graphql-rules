import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import Auth from '../components/auth';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Auth>
      {(meta) => {
        if (!meta.isAuthed) {
          return <button onClick={() => meta.signIn('github')}>Войти через GitHub</button>;
        } else {
          return (
            <div>
              <div>
                You are logged in as: {meta.displayName}{' '}
                <img src={meta.photoURL} width={50} height={50} />
              </div>
              <button onClick={() => meta.signOut()}>Logout</button>
            </div>
          );
        }
      }}
    </Auth>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
