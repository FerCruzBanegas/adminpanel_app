import React from 'react';
import { Table, TBody, TR, TD, A } from 'oy-vey';

const Footer = (props) => {
  const style = {
    backgroundColor: '#f6f6f6',
    marginTop: '35px'
  };

  const spaceStyle = {
    paddingLeft: '5px',
    color: '#8B8B8B',
    fontSize: '18px',
    textAlign: 'center',
  };

  const heartIcon = {
    fontSize: '16px',
  }

  return (
    <Table width="100%" style={style}>
      <TBody>
        <TR>
          <TD>
            <div style={spaceStyle}>Sent with <span style={heartIcon}>&#10084;</span> from {props.siteName}</div>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

export default Footer;
