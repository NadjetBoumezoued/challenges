import React, { useState, useEffect } from 'react';
import './Home.css';
import vacheImage from '../../assets/vache.png';
import laitImage from '../../assets/lait.png';
import babyImage from '../../assets/calendrier.png';

const HomePage = () => {
  const [totalVaches, setTotalVaches] = useState(0);
  const [totalNaissances, setTotalNaissances] = useState(0);
  const [averageProd, setAverageProd] = useState(0); 


  useEffect(() => {
    fetchVachesData();
    fetchNaissancesData();
    fetchProdData();
  }, []);

  const fetchVachesData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vaches');
      if (!response.ok) {
        throw new Error('Failed to fetch vaches data');
      }
      const data = await response.json();
      const total = data.length;
      setTotalVaches(total);
    } catch (error) {
      console.error('Error fetching vaches data:', error);
    }
  };

  const fetchNaissancesData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/naiss');
      if (!response.ok) {
        throw new Error('Failed to fetch naissances data');
      }
      const data = await response.json();
      const total = data.length;
      setTotalNaissances(total);
    } catch (error) {
      console.error('Error fetching naissances data:', error);
    }
  };
  const fetchProdData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/prod');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const totalQuantity = data.reduce((accumulator, item) => {
        const quantity = parseFloat(item.qte);
        return accumulator + (isNaN(quantity) ? 0 : quantity); 
      }, 0);
      const averageQuantity = totalQuantity / data.length; 
  
      // Format the average quantity to have only two decimal places
      const formattedAverage = averageQuantity.toFixed(2);
  
      setAverageProd(formattedAverage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  return (
    <div className="container">
      <Square title="Total du vaches" number={totalVaches} imageSrc={vacheImage} />
      <Square title="Total du naissance" number={totalNaissances} imageSrc={babyImage} />
      <Square title="Moyenne du production " number={averageProd} imageSrc={laitImage} />

    </div>
  );
}

const Square = ({ title, number, imageSrc }) => {
  return (
    <div className="square">
      <div>
        <p>{number}</p>
        <b>{title}</b>
      </div>
      <img src={imageSrc} alt={title} />
    </div>
  );
}

export default HomePage;
