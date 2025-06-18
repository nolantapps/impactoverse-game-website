import { useEffect, useRef } from 'react';
import DataStore from './components/DataStore';
import {v4 as uuid} from "uuid";

const ScreenTimeTracker = ({ gameId }) => {
  const startTimeRef = useRef(Date.now());
  const sessionId = useRef(uuid());
  const hasStarted = useRef(false);

  useEffect(() => {
    const sendFinalTime = async (type) => {
      const token = DataStore.getToken();
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

      if (type === 'start') {
        if (hasStarted.current) return;
        hasStarted.current = true;
        console.log(`✅ Started session ${sessionId.current}`, duration);
      } else {
        if (!hasStarted.current) return;
        hasStarted.current = false;
        console.log(`🛑 Ended session ${sessionId.current}`, duration);
      }

      if (
        (type === 'start' && duration === 0) ||
        (type === 'end' && duration > 0)
      ) {
        console.log(`📊 Sending session data for ${sessionId.current} to the server`);
        await fetch(`${import.meta.env.VITE_BASEURL}/data/heartbeat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            sessionId: sessionId.current,
            gameId,
            beatType: type,
          }),
        });
       
      }
    };

    sendFinalTime('start');

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      sendFinalTime('end');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      sendFinalTime('end');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};



export default ScreenTimeTracker;