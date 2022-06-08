import { useContext, useEffect } from "react"

import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { useCan } from "../hooks/useCan";
import { Can } from "../component/Can";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

//   const userCanSeeMetrics = useCan({
//     roles: ['administrator'],
//   })


  useEffect(() => {
    api.get('/me').then(response => console.log(response)).catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      {/* { userCanSeeMetrics && <div>Métricas</div>} */}
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/me');
  
    console.log(response.data);
  
    return {
      props: {},
    }
  });