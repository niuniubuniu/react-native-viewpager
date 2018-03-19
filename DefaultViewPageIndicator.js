'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = ReactNative;
import  PropTypes from  'prop-types'

var deviceWidth = Dimensions.get('window').width;

var DOT_SIZE = 6
var DOT_SAPCE = 8;



class DefaultViewPageIndicator extends React.Component{
  static propTypes = {
    goToPage: PropTypes.func,
    activePage: PropTypes.number,
    pageCount: PropTypes.number,
    dotStyle: PropTypes.object,
    selectedDotStyle: PropTypes.object,
  }

  getInitialState() {
    return {
      viewWidth: 0,
    };
  }

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.dot,this.props.dotStyle]} />
      </TouchableOpacity>
    );
  }

  render() {
    var pageCount = this.props.pageCount;
    var dotSize = this.props.dotSize == null ? DOT_SIZE : this.props.dotSize;//by melody
    var itemWidth = dotSize + (DOT_SAPCE * 2);
    var offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;

    //var left = offset;
    var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    })

    var indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i))
    }

    return (
      <View style={styles.tabs}
        onLayout={(event) => {
            var viewWidth = event.nativeEvent.layout.width;
            
            if (!viewWidth || this.state.viewWidth === viewWidth) {
              return;
            }
            this.setState({
              viewWidth: viewWidth,
            });
          }}>
        {indicators}
        <Animated.View style={[styles.curDot, this.props.selectedDotStyle, {left}]} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },

  tabs: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#E0E1E2',
    marginLeft: DOT_SAPCE,
    marginRight: DOT_SAPCE,
  },

  curDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#80ACD0',
    margin: DOT_SAPCE,
    bottom: 0,
  },
});

module.exports = DefaultViewPageIndicator;
