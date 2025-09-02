import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Alert, Spinner} from 'react-bootstrap';

import axios from 'axios';
import SessionForm from './SessionForm';

function EditSession() {
  const params = useParams();
  const [alert, setAlert] = useState({message: '', variant: ''});
  const [session, setSession] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {fetchSession();}, []);

  const fetchSession = () => {
    axios.get(`/api/sessions/${params.id}`)
      .then(results => {
        setSession(results.data);
      })
      .catch(error => {
        setAlert({message: 'Failed to load session.', variant: 'danger'});
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <>
      <h3>Edit Session</h3>

      {!!alert.message && <Alert className='text-center' variant={alert.variant} onClose={() => setAlert({message: '', variant: ''})} dismissible>{alert.message}</Alert>}

      {isLoading ? <div className='text-center'><Spinner /></div> : !alert.message && <SessionForm session={{...session, id: params.id}} />}
    </>
  );
}

export default EditSession;