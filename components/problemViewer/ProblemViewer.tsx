import classes from "./pviewer.module.css";
import React from 'react';
import problemSet from './problem_set.json';
import LoaderPage from "../loader/LoaderPage";

function ProblemViewer({ id }: {id:number}) {
  const data = require(`../../public/dataset/${id}/${id}.json`);
  const problem = data[id];
  
  if(!data){
    return <LoaderPage />
  }
  
  return (
    <div className={classes.problem_viewer}>
      <div className={classes.problem_header}>
        <div className={classes.title}>
          {'A'}{id}. {problem.title}
        </div>
        <div className={classes.difficult}>
          <span className={classes[problem.difficult]}>
            {problem.difficult.toLowerCase()}
          </span>
        </div>
        <div className={classes.tags}>
          {problem.categories.map((el: any, key: any) => (
            <span className={classes.tag} key={key}>{el}</span>
          ))}
        </div>
      </div>
      <div className={classes.content}>
        {problem.content.map((el:any, key: any) => {
          return <p key={key}>{el}</p>;
        })}
      </div>
      <div className={classes.examples}>
        {problem.examples && problem.examples.map((el: any, index: any) => {
          return (
            <div className={classes.example} key={index}>
              <span className=""> Case {index + 1}</span>
              <div className={classes.input}>
                {
                  el.input.split("\n").map( (el:any, key: any) => {
                    return <span key={key} className={classes.line}>{el}</span>
                  })
                }  
              </div>
              <span className="">Output</span>
              <div className={classes.output}>
              {
                  el.output.split("\n").map( (el:any, key: any) => {
                    return <span key={key} className={classes.line}>{el}</span>
                  })
                }   
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProblemViewer;
