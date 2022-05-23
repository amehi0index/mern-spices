import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

/*Alert component, alertContext, alert css styles from Brad Traversy*/
const Alert = () => {
   
    const  alertContext = useContext(AlertContext)
    const { alerts } = alertContext
 
     return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" />{' '}{alert.msg}
            </div>
        ))
     )
 }
 
export default Alert
