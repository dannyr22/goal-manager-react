import Airtable from 'airtable';
import { useEffect, useState } from 'react'
import Goal from './components/Goal';
import styled from 'styled-components';

import { GlobalStyle } from './styles/Global.style';

const StyledH1 = styled.h1` 
text-align: ceneter;
font-size: 4rem;
margin: 1rem 0rem;
`

const base = new Airtable({ apiKey: "keyZECWHt2mmot3G7" }).base("appmBas8uUiznpCO5");
function App() {
  const [updates, setUpdates] = useState([])
  const [goals, setGoals] = useState([])
  useEffect(() => {
    base("goals")
      .select({ view: "Grid view" })
      .eachPage(( records, fetchNextPage ) => {
      setGoals(records);
      fetchNextPage();
      })
    base("updates")
      .select({ view: "Grid view" })
      .eachPage(( records, fetchNextPage ) => {
      setUpdates(records);
      fetchNextPage();
      })
  }, [])



  return (
    <>
      <GlobalStyle />
      <StyledH1>My Goals</StyledH1>
      {goals.map(goal => (
        <Goal
          key={goal.id}
          goal={goal}
        updates={updates.filter(update => update.fields.goalid === goal.id)}/>
      
      ))}
    </>
    
  );
}

export default App;
