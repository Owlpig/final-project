import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const ProfilePage = () => {
  const { authService } = useOktaAuth;
  const [user, setUser] = useState({user: ''})

  const getCurrentUser = () => {
    authService.getUser()
    .then(user => setUser({ user }))
  }

  useEffect(() => {
    getCurrentUser();
  }, []);
  
  if (!user) {
    return null;
  };
  return(
    <section>
      <h1 className='user-profile'></h1>
      <h1>User Profile</h1>
        <div>
          <label>Name:</label>
          <span>{user.name}</span>
        </div>
    </section>
  )
}
export default ProfilePage;