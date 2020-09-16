import React from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { voidFn } from 'utils/common';
import './styles.scss';

export default function ExchangeHeader() {
  const renderCloseButton = () => (
    <CloseIcon
      className="closeButton"
      onClick={voidFn}
    />
  );

  const renderTitle = () => (
    <span className="headerTitle">
      Exchange
    </span>
  );

  const renderAutoButton = () => (
    <span className="autoButton" onClick={voidFn}>
      Auto
      <AutorenewIcon />
    </span>
  );

  return (
    <div className="exchangeHeaderContainer">
      <Grid className="exchangeHeaderGrid" container spacing={2} alignItems='center'>
        <Grid className="closeButtonContainer" item xs={2} >
          {renderCloseButton()}
        </Grid>
        <Grid item xs={6}>
          {renderTitle()}
        </Grid>
        <Grid className="autoButtonContainer" item xs={4}>
          {renderAutoButton()}
        </Grid>
      </Grid>
    </div>
  );
}
