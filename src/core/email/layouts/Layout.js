import React from 'react';
import { Table, TBody, TR, TD } from 'oy-vey';


export default (props) => {
  return (
    <Table width='100%'
      style={{ WebkitTextSizeAdjust: '100%', msTextSizeAdjust: '100%', msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', margin: '0px auto' }}>
      <TBody style={{ background: '#F6F6F6' }}>
        <TR>
          <TD>
            {/* Centered column */}
            <Table
              style={{ WebkitTextSizeAdjust: '100%', msTextSizeAdjust: '100%', msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', margin: '90px auto', backgroundColor: '#f7f7f7', width: '100%', maxWidth: '425px' }}>
              <TBody>
                <TR>
                  <TD>
                    {props.children}
                  </TD>
                </TR>
              </TBody>
            </Table>

          </TD>
        </TR>
      </TBody>
    </Table>
  );
};
