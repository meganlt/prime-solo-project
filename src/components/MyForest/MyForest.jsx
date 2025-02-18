import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function MyForest() {
  
  const user = useStore((state) => state.user);
  const fetchAvailableTrinkets = useStore( (state)=>state.fetchAvailableTrinkets);
  const availableTrinkets = useStore((state) => state.availableTrinkets );
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect( ()=>{
    const fetchData = async ()=>{
      if (availableTrinkets.length === 0) {
        await fetchAvailableTrinkets(user.id);
      }
      if (forestMembers.length === 0) {
        await fetchForestMembers();
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, [ fetchAvailableTrinkets, fetchForestMembers, user.id, availableTrinkets ] );

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
            availableTrinkets.map( (trinket, index)=>(
              <tr key={index}>
                <td><img src={trinket.image}/></td>
                <td>{trinket.name}</td>
                <td>{trinket.category}</td>
                <td>{trinket.term}</td>
                <td><img src={trinket.avatar} width="50px"/>{trinket.username}</td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
      <h2>All Members:</h2>
      {
        forestMembers.map( (member, index)=>(
          <div key={index}>
            <h6>{member.role}</h6>
            <img src={member.avatar} width="100px"/>
            <h4>{member.username}</h4>
          </div>

        ))
      }
      {JSON.stringify(forestMembers)}
    </>
  );
}


export default MyForest;