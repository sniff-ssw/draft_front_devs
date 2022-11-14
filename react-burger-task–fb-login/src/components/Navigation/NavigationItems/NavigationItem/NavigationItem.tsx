import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const navigationItem = (props: any) => (
  <li className={styles.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName='active'
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
