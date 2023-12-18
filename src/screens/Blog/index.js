import React, { Component } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { Ad, AppRoot, Header, SearchInput } from '../../component';
import c from '../../styles/commonStyle';
import { Screen, Colors, Storage_Key, Constants } from '../../config/appConstants';
import BlogList from '../../list/Blog';
import { connect } from "react-redux";
import { PrefManager } from '../../utils';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
import { blogActions, onBlogClear, onBlogLazyLoad } from '../../redux/actions/blogActions';
const s = StyleSheet.create({})
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      InterstitialAd: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY)
    }
    this.pullDown();
  }
  componentDidMount() {
    Screen.OrientationChange(this);
  }


  
  componentWillUnmount() {
    Screen.OrientationListener();
  }

  render() {
    const { navigation, dataSource, fileURL } = this.props;
    return (
      <AppRoot>
        <View style={c.flexStyle}>
          <Header
            text={'Blog'}
            onBack={() => {
              this.state.InterstitialAd.show()
              navigation.goBack()}}
          />
          <SearchInput
            onSearch={(txt) => {
              this.props.onBlogClear()
              this.setState({ search: txt }, () => {
                this.pullDown()
              })
            }}
            onClear={() => {
              this.props.onBlogClear()
              this.setState({ search: '' }, () => {
                this.pullDown()
              })
            }}
            searchText={this.state.search}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            data={dataSource.length > 0 ? dataSource : []}
            renderItem={({ item, index }) => {
              return (
                <BlogList
                  item={item}
                  index={index}
                  fileURL={fileURL}
                  onPress={() => {
                    // try {
                    //   alert()
                    //   this.state.InterstitialAd.show()
                    // } catch (error) {
                    //   console.log('error', error);
                    // }
                    navigation.navigate('BlogView', { data: item })
                  }}
                />
              )
            }}
            ListFooterComponent={this.Footer()}
            refreshControl={this.refreshControl()}
            onEndReached={() => dataSource.length >= 8 && this.pullDown()}
            onEndReachedThreshold={0.01}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </AppRoot>
    )
  }

  pullDown = async () => {
    if (this.props.pageData.includes(this.props.page)) {
    } else {
      const id = await PrefManager.getValue(Storage_Key.id);
      let request = {
        start: this.props.page,
        limit: 8,
        id: id,
        search: this.state.search
      }
      this.props.blogActions(request);
    }
  };
  refreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.loading}
        onRefresh={() => {
          this.props.onBlogClear()
          this.setState({}, () => {
            this.pullDown()
          })
        }}
        tintColor={Colors.primary}
      />
    );
  };
  Footer = () => {
    if (this.props.lazy) {
      return (
        <View style={c.lazyRoot}>
          <ActivityIndicator color={Colors.secondary} size={'large'} />
        </View>
      );
    }
  };

}
const mapStateToProps = state => {
  // console.log('state', state.blog);
  return {
    dataSource: state.blog.blogData,
    fileURL: state.blog.file_url,
    loading: state.blog.loading,
    page: state.blog.page,
    lazy: state.blog.lazy,
    pageData: state.blog.pageData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blogActions: data => {
      dispatch(blogActions(data))
    },
    onBlogClear: data => {
      dispatch(onBlogClear(data))
    },
    onBlogLazyLoad: data => {
      dispatch(onBlogLazyLoad(data))
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);