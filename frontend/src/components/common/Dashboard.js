import React, { useState } from 'react';
import SideBar from './SideBar';
import Vache from '../vache/vache';
import Examen from  '../examen/examen';
import Naissance from  '../naissance/naissance';
import Production from  '../production/production';



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
      default:
        return null;

      
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