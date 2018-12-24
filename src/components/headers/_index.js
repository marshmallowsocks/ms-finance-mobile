import React from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ValueDisplayCard from '../cards/ValueDisplayCard';
import constants from '../../constants';
import {
    Icon,
    Button,
} from 'react-native-elements';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 80;
  
const { width: SCREEN_WIDTH } = Dimensions.get("screen")

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        });
        const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });

        const {
            netBalance,
            cashBalance,
            creditDebt,
            investmentBalance,
        } = this.props.balances;

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Animated.Text style={[styles.collapsedHeader, { opacity: headerTitleOpacity }]}>MS Finance</Animated.Text>
                    <Animated.View style={{opacity: heroTitleOpacity}}>
                        <Text style={styles.netBalanceDescription}>Your net worth is</Text>
                        <Text style={styles.netBalance}>
                            {netBalance}
                        </Text>
                        <View style={styles.breakdownLinkContainer}>
                            <Button
                                clear
                                title={'See breakdown'}
                                titleStyle={styles.breakdownLink}
                                containerStyle={{
                                    borderWidth: 1,
                                    borderColor: constants.colors.BASE_OFFWHITE,
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }
                        }])
                    }
                    scrollEventThrottle={16}>
                    {this.props.children}
                </ScrollView>
            </View>
        );
    }
}
      
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colors.BASE_OFFWHITE,
    },
    scrollContainer: {
        paddingTop: HEADER_EXPANDED_HEIGHT,
    },
    header: {
        backgroundColor: constants.colors.BASE_RED,
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0,
        zIndex: 9999,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    title: {
        marginVertical: 16,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24
    },
    netBalance: {
        textAlign: 'center',
        fontSize: 48,
        color: constants.colors.BASE_OFFWHITE,
    },
    collapsedHeader: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: constants.colors.BASE_OFFWHITE,
        marginTop: 38,
    },
    netBalanceDescription: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22,
        color: constants.colors.BASE_OFFWHITE
    },
    breakdownLinkContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    breakdownLink: {
        fontSize: 20,
        color: constants.colors.BASE_OFFWHITE,
    },
});

export default Header;