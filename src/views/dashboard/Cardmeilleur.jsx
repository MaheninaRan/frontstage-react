// Cardmeilleur.jsx
import React from 'react';
import { Table } from 'react-bootstrap'; 
import avatar2 from '../../assets/images/user/avatar-2.jpg';

const Cardmeilleur = ({ nom,prenom, amount,unite }) => {
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };
  return (
    <React.Fragment>
      <Table responsive hover className="recent-users">
        <tbody>
          <tr className="unread">
            <td>
              <img
                className="rounded-circle"
                style={{ width: '40px' }}
                src={avatar2}
                alt="activity-user"
              />
            </td>
            <td>
              <h6 className="mb-1">{nom} {prenom}</h6>
            </td>
            <td>
              <h6 className="mb-1">{formatNumber(amount)} {unite} </h6>
            </td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default Cardmeilleur;
