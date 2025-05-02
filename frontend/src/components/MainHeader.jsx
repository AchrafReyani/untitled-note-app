import { Link } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';
import { useContext } from 'react';

import { BackendStatusContext } from './BackendStatusContext';
import classes from './MainHeader.module.css';

function MainHeader() {
  const { isBackendOnline } = useContext(BackendStatusContext);

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        Untitled Note App
      </h1>
      <p>
        <Link to='/create-post' className={`${classes.button} ${!isBackendOnline ? classes.disabled : ''}`}
        onClick={(e) => {
          if (!isBackendOnline) {
            e.preventDefault();
          }
        }}
        >
          <MdPostAdd size={18} />
          New Note
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;