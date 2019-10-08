import React, { Component } from 'react';

// Custom scrollbar
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// Components
import Channel from '../Channel';

class ChannelList extends Component {
    render() {
        return (
            <SimpleBar className="channels-body">
                <Channel/>
            </SimpleBar>
        )
    }
}
export default ChannelList;