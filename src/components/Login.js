import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setFBID } from '../actions';
/* global FB */

const Container = styled.div`
  text-align: center;
  line-height: 6em;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.REACT_APP_FB_APPID,
        cookie: true,
        xfbml: true,
        version: 'v9.0',
      });

      setLoading(true);
      FB.getLoginStatus(({ status, authResponse }) => {
        if (status === 'connected') {
          dispatch(setFBID(authResponse.userID));
        } else {
          setLoading(false);
          FB.Event.subscribe('auth.login', () => window.location.reload());
        }
      });
    };
  }, []);

  return loading ? null : (
    <Container>
      <div
        className="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="true"
      />
    </Container>
  );
};

export default Login;
