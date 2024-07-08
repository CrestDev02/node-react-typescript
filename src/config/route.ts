import IRoute from '../types/routes';
import { Home } from '../components/home/home';
import { Login } from '../components/auth/login/login';
import { Signup } from '../components/auth/signup/signup';
import { Profile } from '../components/user-profile/user-profile';
import { Developers } from '../components/developer/developers';
import { DevProfile } from '../components/user-profile/view-dev-profile';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: Home,
        exact: true
    },
    {
        path: '/login',
        name: 'Login Page',
        component: Login,
        exact: true
    },
    {
        path: '/signup',
        name: 'Signup Page',
        component: Signup,
        exact: true
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        exact: true
    },
    {
        path: '/developers',
        name: 'Developers',
        component: Developers,
        exact: true
    },
    {
        path: '/profile/:id',
        name: 'View Profile',
        component: DevProfile,
        exact: true
    },
]

export default routes;