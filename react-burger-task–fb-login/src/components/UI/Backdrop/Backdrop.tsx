import './Backdrop.css';

const backdrop = (props: any) => (
    props.show ? <div className='Backdrop' onClick={props.clicked}></div> : null
);

export default backdrop;