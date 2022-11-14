import './DrawerToggle.css';

const drawerToggle = (props: any) => (
    <div className='DrawerToggle' onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;