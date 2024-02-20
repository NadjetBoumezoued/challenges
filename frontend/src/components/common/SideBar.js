import React, { useState} from 'react';
import './SideBar.css'
import Logo from '../../assets/logo.png';
function SideBar(props) {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    props.onIconClick(icon);
  };

  return (
        <div className="sidebar">
             <div className="sidebar-logo ">
               <img src={Logo} alt="logo" class="logo"/>
             </div>
             <div className={`sidebar-icon ${activeIcon === 'home' ? 'active' : ''}`} onClick={() => handleIconClick('home')}>          
              <span><b>Acceuil</b></span>
            </div>
            <div className={`sidebar-icon ${activeIcon === 'vaches' ? 'active' : ''}`} onClick={() => handleIconClick('vaches')}>     
              <span><b>Vaches</b></span>
            </div>
            <div className={`sidebar-icon ${activeIcon === 'examen' ? 'active' : ''}`} onClick={() => handleIconClick('examen')}>          
              <span><b>Examens Médicaux</b></span>
            </div>
            <div className={`sidebar-icon ${activeIcon === 'naissance' ? 'active' : ''}`} onClick={() => handleIconClick('naissance')}>          
              <span><b>Naissances</b></span>
            </div>
            <div className={`sidebar-icon ${activeIcon === 'production' ? 'active' : ''}`} onClick={() => handleIconClick('production')}>          
              <span><b>Production </b></span>
            </div>
           
          </div>  
      
    
  );
};

export default SideBar;
