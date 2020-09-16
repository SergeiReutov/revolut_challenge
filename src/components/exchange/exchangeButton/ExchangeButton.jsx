import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './styles.scss';

export default function ExchangeButton(props) {
  const { isDisabled, onExchangeButtonClick } = props;

  const renderButton = () => (
    <Button
      className="exchangeButton"
      variant="contained"
      disableElevation
      disabled={isDisabled}
      onClick={onExchangeButtonClick}
    >
      Exchange
    </Button>
  );

  return (
    <div className="exchangeButtonContainer">
      {renderButton()}
    </div>
  );
}

ExchangeButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onExchangeButtonClick: PropTypes.func.isRequired
};
