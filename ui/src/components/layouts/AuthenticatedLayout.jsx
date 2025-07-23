import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AuthenticatedOnlyLayout = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate to='/unauthenticated' replace/>
    );
  }

  return <Outlet />;
}

export default AuthenticatedOnlyLayout;