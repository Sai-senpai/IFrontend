import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import "./SpinnerComponent.css"

const SpinnerComponent = (props) => {
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSpinnerVisible(false);
    }, 2000); // Duration for the spinner to be visible (in milliseconds)

    return () => clearTimeout(timer);
  });

  return (
    <div className={`spinner-wrapper ${isSpinnerVisible ? 'visible' : ''}`}>
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" role="status" className="spinner">
          <span className="visually-hidden">{props.message}</span>
        </Spinner>
        <h5 className="text-center mt-3">{props.message}</h5>
      </div>
    </div>
  );
};

export default SpinnerComponent;
