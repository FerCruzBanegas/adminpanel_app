import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserReceipt from './UserReceipt';
import ProviderReceipt from './ProviderReceipt';

class EmailTemplate extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired
    };

    render() {
        const { type, content, priceDetails } = this.props;

        return (
            <div>
                {
                    type === 'userReceipt' && <UserReceipt content={content} priceDetails={priceDetails} />
                }
                {
                    type === 'providerReceipt' && <ProviderReceipt content={content} priceDetails={priceDetails} />
                }
            </div>
        );
    }
}

export default EmailTemplate;
