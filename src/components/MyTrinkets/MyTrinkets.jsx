import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import MyTrinketItem from '../MyTrinketItem/MyTrinketItem';
import AddTrinket from '../AddTrinket/AddTrinket';

function MyTrinkets() {
  const user = useStore((state) => state.user);
  const fetchUserTrinkets = useStore( (state)=>state.fetchUserTrinkets);
  const userTrinkets = useStore((state) => state.userTrinkets );
  const forestMembers = useStore((state)=>state.forestMembers );
  const fetchForestMembers = useStore((state)=>state.fetchForestMembers );

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect( ()=>{
    const fetchData = async ()=>{
      if (userTrinkets.length === 0) {
        await fetchUserTrinkets(user.id);
      }
      if (forestMembers.length === 0) {
        await fetchForestMembers();
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, [ fetchUserTrinkets, fetchForestMembers, user.id, userTrinkets ] );

  if (isLoading) return <p>Loading Trinkets...</p>;
  if (!forestMembers.length) return <p>no forest members found</p>;

  return (
    <>
      <div className="page-header">
        <h1>My Trinkets</h1>
      </div>

      <AddTrinket/>
      {/* <h2>{user.username}'s Trinkets</h2> */}
      <ul className="trinket-list">
        {
          userTrinkets.map( (trinket, index)=>(
            <MyTrinketItem key={index} trinket={trinket} forestMembers={forestMembers}/>
          ))
        }
      </ul>
    </>
  );
}


export default MyTrinkets;