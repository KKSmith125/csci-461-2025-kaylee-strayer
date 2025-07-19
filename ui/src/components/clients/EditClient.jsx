import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Spinner, Alert} from 'react-bootstrap';
import axios from 'axios';

import ClientForm from './ClientForm';

const EditClient = () => {
  const params = useParams();
  const [alert, setAlert] = useState({message: '', variant: ''});
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState({name: '', weight: 0, height_ft: 0, height_in: 0});

  useEffect(() => {fetchClient();}, []);

  const fetchClient = () => {
    axios.get(`/api/client/${params.id}`)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        setAlert({message: `Error loading client :(`, variant: 'danger'});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {!!alert.message &&
      <Alert className='text-center' variant={alert.variant} onClose={() => setAlert({message: '', variant: ''})} dismissible>{alert.message}</Alert>
      }

      <h3 className='pb-3'>Edit Client</h3>
      {isLoading ? <center><Spinner /></center> : !!!alert.message && <ClientForm client={client}/>}
    </>
  );
}

export default EditClient;