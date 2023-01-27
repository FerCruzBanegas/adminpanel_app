import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { locales, siteUrl } from '../../../config';
import { injectIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
class CurrencyView extends Component {
    static propTypes = {
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
    };

    render() {
        const { amount, currency, showStatic, subIcon } = this.props;
        const { formatNumber } = this.props.intl;
        let inrIcon = subIcon ? siteUrl + "/images/icons/rupeesGray.png" : siteUrl + "/images/icons/rupeesBlack.png"
        if (currency == 'INR' && showStatic) {
            return (
                <View>
                    <Image src={inrIcon} style={{ width: '6px' }} />{' '}
                    <span style={{}}>{formatNumber(amount.toFixed(2), { style: 'decimal' })}</span>
                </View>
            );
        } else if (currency != 'INR' && showStatic) {
            return (
                <Text>
                    {amount.toLocaleString(locales[0], { style: 'currency', currency })}
                </Text>
            );
        } else {
            return (
                <span>
                    {amount.toLocaleString(locales[0], { style: 'currency', currency })}
                </span>
            );
        }
    }
}

export default injectIntl(CurrencyView);
