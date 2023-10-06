import { useAppContext } from '../context/AppContext';
import SyncSVG from '../assets/sync.svg';
import '../styles/Header.css'

const Header = () => {
  const { loading, startSyncQueue } = useAppContext();
  
  return (
    <div className='header'>
      <img
        src={SyncSVG}
        alt="My Icon"
        style={{ width: '22px', height: '22px', cursor: 'pointer' }}
        onClick={startSyncQueue}
      />{' '}
      <span>{loading ? 'Syncing' : 'Synced'}</span>
    </div>
  );
};

export default Header;
