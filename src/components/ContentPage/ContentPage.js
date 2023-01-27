import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ContentPage.css';
import { api, contentPageUploadDir } from '../../config'

class ContentPage extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    }

    render() {
        const { title, data } = this.props;
        let addClass = 'ql-editor frontend';

        return (
            <div>
                {
                    data && data.pageBanner && <div
                        className={s.backGroungImg}
                        style={{ backgroundImage: `url(${api.apiEndpoint + contentPageUploadDir + data.pageBanner})` }} />
                }
                <div className={s.cotainer}>
                    <div className={s.staticContainer}>
                        <h1>{title}</h1>
                        <div className={addClass} dangerouslySetInnerHTML={{ __html: data && data.content || '' }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(s)(ContentPage);