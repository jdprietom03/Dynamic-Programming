import { Fragment } from 'react'

function TopicsMenu() {
    const topics = ['Math', 'Greedy', 'Implementation', 'Graph', 'Sortings', 'DP', 'Trees', 'Brute force'];

    const handleFilter = (e:any) => {
      e.preventDefault()
      console.log(`Se presionó ${e.target.value}`)
    }

    return (
      <Fragment>
        <h1 className="topics-title">Main topics</h1>
        <p className="topics-description">You can choose any topic to filter the problems avalaible at the platform</p>
        <br/>
        <div className="topics">
          {
            topics.map((topic, key) => {
              return <div className='topic' key = {key}><button
                  onClick = {handleFilter}
                  value={topic}
                  name="topic"
                  >
                  {topic}</button></div>
            })
          }
        </div>     
      </Fragment>
      
    );
  }
  
export default TopicsMenu;