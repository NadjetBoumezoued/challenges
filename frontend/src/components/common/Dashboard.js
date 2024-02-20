import React, { useState } from 'react';
import SideBar from './SideBar';
import Vache from '../vache/vache';
import Examen from  '../examen/examen';
import Naissance from  '../naissance/naissance';
import Production from  '../production/production';
import Home from  './Home';


import './Dashboard.css'

function Dashboard() {
    const [activeOption, setActiveOption] = useState(null);

  const handleIconClick = (icon) => {
    setActiveOption(icon);
  };

  const renderRightPanel = () => {
    switch (activeOption) {
      case 'vaches':
        return <Vache/>;
      case 'examen':
        return <Examen/>;
      case 'naissance':
          return <Naissance/>;
      case 'production':
          return <Production/>;
      case 'home':
            return <Home/>;
      default :
          return <Home/>;

      
    }
  };
    return (
        <div>
          <div className="leftPanel">
          <SideBar onIconClick={handleIconClick} />
          </div>
        
          <div className="rightPanel">
          {renderRightPanel()}
          </div>
        </div>
      );
}


export default Dashboard