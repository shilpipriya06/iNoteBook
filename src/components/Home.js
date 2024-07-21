import React from "react";
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div className="conatiner my-3">
    <Notes showAlert={showAlert}/>
      
    </div>


    
  );
};

export default Home;
