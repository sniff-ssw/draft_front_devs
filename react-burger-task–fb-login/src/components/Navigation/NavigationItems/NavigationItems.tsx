import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

import FacebookLoginComponent from '../../facebooklogin.component';

const navigationItems = (props: any) => (
  <ul className='NavigationItems'>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <>
      <NavigationItem link="/auth">Authenticate</NavigationItem>      
      <FacebookLoginComponent />
      </>
    )}
  </ul>
);

export default navigationItems;
