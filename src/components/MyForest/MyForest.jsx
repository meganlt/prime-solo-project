import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import MyForestTrinket from '../MyForestTrinket/MyForestTrinket';

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
      <main className='myforest'>
        <div className='available-trinkets'>
          <h1>MyForest</h1>
          <h2>All Available Trinkets:</h2>
          <table className="forest-trinket-table">
            <thead>
              <tr>
                <th></th>
                <th>Trinket Name:</th>
                <th>Category:</th>
                <th>Borrow Terms:</th>
                <th>Owner:</th>
              </tr>
            </thead>
            <tbody>
              {
                availableTrinkets.map( (trinket, index)=>(
                  <MyForestTrinket key={index} trinket={trinket}/>
                ))
              }
              
            </tbody>
          </table>
        </div>
        <aside className='member-list'>
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
        </aside>
      </main>
    </>
  );
}


export default MyForest;