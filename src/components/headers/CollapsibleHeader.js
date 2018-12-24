import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import posed from 'react-native-pose';
import constants from '../../constants';
import {
    Icon,
    Button,
} from 'react-native-elements';

class CollapsibleHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
        };
    }

    componentDidMount() {
        setTimeout(() =>{
            this.setState({
                isHidden: true,
            })
        }, 10000);
    }

    render() {
        const Box = posed.View({
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
        });

        return (
            <View style={styles.container}>
                <Box pose={ this.state.isHidden ? '' : 'visible'}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        Hello
                    </Text>
                </View>
                <View style={styles.controlsContainer}>
                    <Icon 
                        name='cogs'
                        type='font-awesome'
                        size={32}
                        iconStyle={styles.controlIconStyle}
                    />
                    <Icon
                        name='plus'
                        type='font-awesome'
                        size={32}
                        iconStyle={styles.controlIconStyle}
                    />
                </View>
                </Box>
            </View>
        );
    }
}
      
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 38,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    headerTextContainer: {
        flex: 0.7
    },
    headerText: {
        fontWeight: '900',
        fontSize: 40,
    },
    controlsContainer: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    controlIconStyle: {
        padding: 10,
    },
});

export default CollapsibleHeader;