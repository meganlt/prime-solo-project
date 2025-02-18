import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyForest() {
  
  const user = useStore((state) => state.user);
  const fetchAllTrinkets = useStore( (state)=>state.fetchAllTrinkets);
  const allTrinkets = useStore((state) => state.allTrinkets );
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect( ()=>{
    const fetchData = async ()=>{
      if (allTrinkets.length === 0) {
        await fetchAllTrinkets();
      }
      if (forestMembers.length === 0) {
        await fetchForestMembers();
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, [ fetchAllTrinkets, fetchForestMembers, user.id, allTrinkets ] );

  if (isLoading) return <p>Loading Trinkets...</p>;
  if (!forestMembers.length) return <p>no forest members found</p>;

  return (
    <>
      <h1>MyForest</h1>
      <h2>All Trinkets:</h2>
      <table>
        <thead>
          <tr>
            <th>(thumbnail)</th>
            <th>Trinket Name:</th>
            <th>Category:</th>
            <th>Borrow Terms:</th>
            <th>Owner:</th>
          </tr>
        </thead>
        <tbody>
          {
            allTrinkets.map( (trinket, index)=>(
              <tr key={index}>
                <td><img src={trinket.image}/></td>
                <td>{trinket.name}</td>
                <td>{trinket.category}</td>
                <td>{trinket.term}</td>
                <td>{trinket.owner_user_id}</td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
      <h2>All Members:</h2>
      {JSON.stringify(forestMembers)}
    </>
  );
}


export default MyForest;