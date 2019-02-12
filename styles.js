import {
  Platform,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'column',
    flexGrow: 1,
    width: 70,
    paddingTop: 5,
    paddingLeft:1,
    paddingRight: 1
  },
  inputBox: {
    textAlign: 'center',
    color: '#39ff14',
    borderBottomColor: '#39ff14',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 30
  },
  inputBoxNarrow: {
    color: '#39ff14',
    borderBottomColor: '#39ff14',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  subContainer: {
    backgroundColor: 'black',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly'
  },
  inputBoxLabel: {
    textAlign: 'center',
    textAlignVertical : 'center',
    color: '#39ff14'
  },
  clickableLabel: {
    width: '100%',
    textAlign: 'center',
    textAlignVertical : 'center',
    color: '#39ff14',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#39ff14',
    elevation: 4,
    shadowRadius: 5,
    shadowOffset : { width: 1, height: 2},
  },
  tabOrderLabel: {
    textAlign: 'center',
    textAlignVertical : 'center',
    color: '#39ff14',
    padding: 5,
    fontSize: 24
  },
  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },
  statLabel: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical : 'center',
    color: '#39ff14',
    backgroundColor: 'black',
    width: '100%'
  },
  modalContent: {
    backgroundColor: 'black',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#FF69B4',
    borderWidth: 3,
    color: '#39ff14'
  },
  modalButton: {
    margin: 5,
    backgroundColor:'black',
    borderRadius:1,
    borderWidth: 1,
    borderColor: '#39ff14',
  },
  button:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'black',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#39ff14'
  },
  buttonText:{
      color:'#39ff14',
      textAlign:'center',
      fontSize: 24
  },
  smallButton:{
    marginRight:4,
    marginLeft:4,
    marginTop:1,
    paddingTop:1,
    paddingBottom:1,
    backgroundColor:'black',
    borderRadius:1,
    borderWidth: 1,
    borderColor: '#39ff14'
  },
  smallButtonText:{
      color:'#39ff14',
      textAlign:'center',
      fontSize: 12
  }
});


export default styles;