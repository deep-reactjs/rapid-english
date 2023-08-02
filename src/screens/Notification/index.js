import React, { Component } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { connect } from "react-redux";
import { Ad, AppRoot, Header, Separator } from '../../component';
import c from '../../styles/commonStyle';
import { Screen, Colors, Storage_Key, Strings, Constants } from '../../config/appConstants';
import NotificationList from '../../list/Notification';
import { PrefManager } from '../../utils';
import { notificationActions } from '../../redux/actions/notificationActions';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
const s = StyleSheet.create({})
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InterstitialAd: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY)
    }
  }
  componentDidMount() {
    PrefManager.getValue(Storage_Key.id).then(id => {
    this.props.notificationActions({id:id})
    })
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  render() {
    const { navigation,dataSource,loading } = this.props;
    return (
      <AppRoot>
        <View style={c.flexStyle}>
          <Header
            text={'Notification'}
            onBack={() => navigation.goBack()}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            refreshControl={this._refreshControl()}
            data={dataSource.data && dataSource.data}
            // contentContainerStyle={c.flexStyle}
            renderItem={({ item, index }) => (
              <NotificationList
                item={item}
                index={index}
                onPress={() => {
                  try {
                    this.state.InterstitialAd.show()
                  } catch (error) {
                    console.log('error', error);
                  }
                  navigation.navigate('BlogView', { data:{
                    pdf_auto:item.pdf_auto.baseurl+item.pdf_auto.pdf,
                    id:item.pdf_auto.id,
                    name:item.pdf_auto.name
                  }  })
                 }}
                onDownload={() => { }}
                onView={() => { }}
              />
            )}
           
             ListEmptyComponent={() => !loading &&  <Separator text={Strings.nono} />}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        <Ad adTypes={'Banner'} />
      </AppRoot>
    )
  }
  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.loading}
        onRefresh={() => { }}
        tintColor={Colors.primary}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataSource: state.notification.notificationData,
    loading: state.notification.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    notificationActions: data => {
      dispatch(notificationActions(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
